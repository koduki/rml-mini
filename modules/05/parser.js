import { $ } from "./util.js";

export function parse(sc) {
  const match = (type) => {
    const token = sc.peek();
    return (token != undefined && token.type === type);
  };

  const take = (type) => {
    const token = sc.peek();
    sc.next();
    if (token.type != type) {
      throw new Error(
        "Syntax Error:type=" + type + ", token.type=" + token.type +
          ", token.value=" + token.value,
      );
    }
    return token;
  };

  const program = () => {
    const _program = [];
    while (match("FUNCDEF")) {
      _program.push(funcdef());
    }
    return _program;
  };

  const funcdef = () => {
    const _funcdef = [];
    _funcdef.push(take("FUNCDEF"));
    _funcdef.push([take("INDENT")]);
    take("PARENTHES_OPEN");
    _funcdef.push(funcargs());
    take("PARENTHES_CLOSE");
    take("BEGIN");
    _funcdef.push(statlist());
    take("END");
    return _funcdef;
  };

  const funcargs = () => {
    const _funcargs = [];
    if (match("INDENT")) {
      while (match("INDENT")) {
        //
      }
    } else {
      _funcargs.push([$("INDENT", null)]);
    }
    return _funcargs;
  };

  const statlist = () => {
    const _statlist = [];
    while (match("INDENT")) {
      _statlist.push(statement());
    }
    return _statlist;
  };

  const statement = () => {
    const _statement = [];
    const name = take("INDENT");
    _statement.push(funccall(name));
    take("SEMICOLON");

    return _statement;
  };

  const funccall = (name) => {
    const _funcall = [];
    _funcall.push($("funccall"));
    _funcall.push([name]);
    take("PARENTHES_OPEN");
    _funcall.push([take("STRING")]);
    take("PARENTHES_CLOSE");

    return _funcall;
  };

  const expr = () => {
    let _expr = term();
    while (match("ADD_OP")) {
      switch (take("ADD_OP").value) {
        case "+":
          _expr = [$("add"), _expr, term()];
          break;
        case "-":
          _expr = [$("sub"), _expr, term()];
          break;
      }
    }
    return _expr;
  };

  const term = () => {
    let _term = factor();
    while (match("MUL_OP")) {
      switch (take("MUL_OP").value) {
        case "*":
          _term = [$("mul"), _term, factor()];
          break;
        case "/":
          _term = [$("div"), _term, factor()];
          break;
      }
    }
    return _term;
  };

  const factor = () => {
    if (match("PARENTHES")) {
      take("PARENTHES");
      const _factor = expr();
      take("PARENTHES");

      return _factor;
    }
    return number();
  };

  const number = () => {
    const _number = take("INT");
    return [_number];
  };

  const ast = program();
  return ast;
}
