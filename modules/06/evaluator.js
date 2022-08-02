export class Evaluator {
  apply(ast) {
    const global = {
      func_table: {
        "print": (args) => {
          syscall_stdout(global, args[0])
        }
      },
      var_table: {},
      stdout: [],
    };

    // 評価を開始
    eval_funclist(global, ast);
    // mainと付いている関数をエントリポイントとして実行
    global.func_table["main"]();
    console.log(global);
    return global;
  }
}

function eval_funclist(global, ast) {
  for (let i = 0; i < ast.length; i++) {
    eval_funcdef(global, ast[i]);
  }
}

function eval_funcdef(global, ast) {
  ast.shift(); // fundef
  const name = ast.shift()[0].value;
  const args = ast.shift()

  global.func_table[name] = (args_values) => {
    const env = {
      var_table: {},
    }
    for (let i = 0; i < args.length; i++) {
      env.var_table[args[i].value] = args_values[i];
    }
    eval_statementlist(global, env, deepCopy(ast).shift());
    return env.result;
  };
}

function eval_statementlist(global, env, ast) {
  for (let i = 0; i < ast.length; i++) {
    eval_statement(global, env, ast[i].shift());
  }
}

function eval_statement(global, env, ast) {
  const token = ast.shift();

  switch (token.type) {
    case "call_func": {
      return eval_call_func(global, env, ast);
    }
    case "RETURN": {
      env.result = eval_expr(global, env, ast.shift())
      return env.result;
    }
    case "VARDEF": {
      const name = ast.shift()[0].value
      const value = eval_expr(global, env, ast.shift()[0]);
      env.var_table[name] = value;
      return env.var_table[name];
    }
    case "SET": {
      const name = ast.shift()[0].value
      const value = eval_expr(global, env, ast.shift());
      env.var_table[name] = value;
      return env.var_table[name];
    }
    case "IF": {
      return eval_if(global, env, ast);
    }
    case "WHILE": {
      return eval_while(global, env, ast);
    }
  }
  throw new Error("Unkown Error");
}

function eval_if(global, env, ast) {
  const guard = eval_relation(global, env, ast.shift())
  const block1 = ast.shift();
  const else_directive = ast.shift();
  const block2 = ast.shift();
  if (guard) {
    eval_statementlist(global, env, block1);
  } else if (else_directive) {
    if (block2[0].type == "IF") {
      block2.shift(); // if directive
      eval_if(global, env, block2);
    } else {
      eval_statementlist(global, env, block2);
    }
  }
}

function eval_while(global, env, ast) {
  while (true) {
    const cloned_ast = deepCopy(ast);
    const guard = eval_relation(global, env, cloned_ast.shift())
    if (!guard) {
      break;
    }
    const block = cloned_ast.shift();
    eval_statementlist(global, env, deepCopy(block));
  }

}

function deepCopy(xs) {
  return JSON.parse(JSON.stringify(xs));
}

function eval_relation(global, env, ast) {
  const token = (Array.isArray(ast)) ? ast.shift() : ast;
  switch (token.type) {
    case "OP_REL": {
      switch (token.value) {
        case "==":
          return eval_expr(global, env, ast.shift()) == eval_expr(global, env, ast.shift());
        case "!=":
          return eval_expr(global, env, ast.shift()) != eval_expr(global, env, ast.shift());
        case "<":
          return eval_expr(global, env, ast.shift()) < eval_expr(global, env, ast.shift());
        case ">":
          return eval_expr(global, env, ast.shift()) > eval_expr(global, env, ast.shift());
        case "<=":
          return eval_expr(global, env, ast.shift()) <= eval_expr(global, env, ast.shift());
        case ">=":
          return eval_expr(global, env, ast.shift()) >= eval_expr(global, env, ast.shift());
        case "direct":
          return eval_expr(global, env, ast.shift());
      }
      break;
    }
  }
}

function eval_expr(global, env, ast) {
  const token = (Array.isArray(ast)) ? ast.shift() : ast;

  switch (token.type) {
    case "add": {
      return eval_expr(global, env, ast.shift()) + eval_expr(global, env, ast.shift());
    }
    case "sub": {
      return eval_expr(global, env, ast.shift()) - eval_expr(global, env, ast.shift());
    }
    case "mul": {
      return eval_expr(global, env, ast.shift()) * eval_expr(global, env, ast.shift());
    }
    case "div": {
      return eval_expr(global, env, ast.shift()) / eval_expr(global, env, ast.shift());
    }
    case "mod": {
      return eval_expr(global, env, ast.shift()) % eval_expr(global, env, ast.shift());
    }
    case "call_func": {
      return eval_call_func(global, env, ast);
    }
    case "INDENT": {
      return env.var_table[token.value];
    }
    case "INT":
    case "STRING":
    case "BOOL":
      return token.value;
  }
}

function eval_call_func(global, env, ast) {
  const name = ast.shift()[0].value;
  const args = ast.shift();
  const mapped_args = args.map((t) => (t.type === "INDENT") ? env.var_table[t.value] : t.value);

  return global.func_table[name](mapped_args);
}

function syscall_stdout(global, text) {
  global.stdout.push(text);
  console.log(global.stdout[global.stdout.length - 1]);
}
