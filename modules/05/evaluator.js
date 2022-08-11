export class Evaluator {
  apply(ast) {
    const env = {
      func_table: {
        "print": (text) => syscall_stdout(env, text),
      },
      stdout: [],
    };

    // 評価を開始
    eval_funclist(env, ast);
    // mainと付いている関数をエントリポイントとして実行
    env.func_table["main"]();
    return env;
  }
}

function eval_funclist(env, ast) {
  for (let i = 0; i < ast.length; i++) {
    eval_funcdef(env, ast[i]);
  }
}

function eval_funcdef(env, ast) {
  ast.shift(); // fundef
  const name = ast.shift()[0].value;
  const args = ast.shift();

  env.func_table[name] = () => {
    eval_statementlist(env, ast.shift());
  };
}

function eval_statementlist(env, ast) {
  for (let i = 0; i < ast.length; i++) {
    eval_statement(env, ast[i].shift());
  }
}

function eval_statement(env, ast) {
  const token = ast.shift();

  switch (token.type) {
    case "funccall": {
      const name = ast.shift()[0].value;
      const args = ast.shift()[0].value;
      return env.func_table[name](args);
    }
  }
  throw new Error("Unkown Error");
}

function syscall_stdout(env, text) {
  env.stdout.push(text);
  console.log(env.stdout[env.stdout.length - 1]);
}
