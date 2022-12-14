import { deep_copy } from "./util.js";
import Config from "./config.js";

export class Evaluator {
  apply(ast) {
    const global = {
      func_table: {
        "print": (args) => {
          syscall_stdout(global, args[0]);
        },
      },
      var_table: {},
      stdout: [],
    };

    // 評価を開始
    eval_program(global, ast);
    // mainと付いている関数をエントリポイントとして実行
    global.func_table["main"]();
    return global;
  }
}

class GoToError extends Error {}
class ReturnError extends GoToError {}
class BreakError extends GoToError {}

function eval_program(global, ast) {
  for (let i = 0; i < ast.length; i++) {
    eval_funcdef(global, ast[i]);
  }
}

function eval_funcdef(global, ast) {
  ast.shift(); // fundef
  const name = ast.shift()[0].value;
  const args = ast.shift();

  global.func_table[name] = (args_values) => {
    const env = {
      var_table: {},
    };
    for (let i = 0; i < args.length; i++) {
      env.var_table[args[i][0].value] = args_values[i];
    }

    try {
      eval_statementlist(global, env, deep_copy(ast).shift());
    } catch (err) {
      if (err instanceof ReturnError) { // 例外では無く正常系。returnが投げられたら大域脱出
        return env.result;
      } else {
        throw err;
      }
    }
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
      return eval_call_func(global, deep_copy(env), ast);
    }
    case "IF": {
      return eval_if(global, env, ast);
    }
    case "WHILE": {
      return eval_while(global, env, ast);
    }
    case "ASSIGN": {
      const name = ast.shift()[0].value;
      const value = eval_expr(global, env, ast.shift());
      env.var_table[name] = value;
      return env.var_table[name];
    }
    case "BREAK": {
      throw new BreakError();
    }
    case "RETURN": {
      env.result = eval_expr(global, env, ast.shift());
      throw new ReturnError();
    }
  }
  throw new Error("Unkown Error");
}

function eval_call_func(global, env, ast) {
  const name = ast.shift().value;
  const args = ast.shift();
  const mapped_args = args.map((t) => eval_expr(global, deep_copy(env), t));

  return global.func_table[name](mapped_args);
}

function eval_if(global, env, ast) {
  const guard = eval_relation(global, env, ast.shift());
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
  try {
    while (true) {
      const cloned_ast = deep_copy(ast);
      const guard = eval_relation(global, env, cloned_ast.shift());
      if (!guard) {
        break;
      }
      const block = cloned_ast.shift();
      eval_statementlist(global, env, block);
    }
  } catch (err) {
    if (!(err instanceof BreakError)) { // 例外では無く正常系。breakが投げられたら大域脱出
      throw err;
    }
  }
}

function eval_relation(global, env, ast) {
  const token = (Array.isArray(ast)) ? ast.shift() : ast;
  switch (token.type) {
    case "OP_REL": {
      switch (token.value) {
        case "==": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x == y;
        }
        case "!=": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x != y;
        }
        case "<": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x < y;
        }
        case ">": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x > y;
        }
        case "<=": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x <= y;
        }
        case "": {
          const x = eval_expr(global, env, ast.shift());
          const y = eval_expr(global, env, ast.shift());
          return x >= y;
        }
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
      const x = eval_expr(global, env, ast.shift());
      const y = eval_expr(global, env, ast.shift());
      return x + y;
    }
    case "sub": {
      const x = eval_expr(global, env, ast.shift());
      const y = eval_expr(global, env, ast.shift());
      return x - y;
    }
    case "mul": {
      const x = eval_expr(global, env, ast.shift());
      const y = eval_expr(global, env, ast.shift());
      return x * y;
    }
    case "div": {
      const x = eval_expr(global, env, ast.shift());
      const y = eval_expr(global, env, ast.shift());
      return x / y;
    }
    case "mod": {
      const x = eval_expr(global, env, ast.shift());
      const y = eval_expr(global, env, ast.shift());
      return x % y;
    }
    case "call_func": {
      return eval_call_func(global, env, ast);
    }
    case "IDENT": {
      return env.var_table[token.value];
    }
    case "INT":
    case "STRING":
    case "BOOL":
      return token.value;
  }
}

function syscall_stdout(global, text) {
  global.stdout.push(text);

  if (Config.is_show_console()) {
    console.log(global.stdout[global.stdout.length - 1]);
  }
}
