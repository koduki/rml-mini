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
        "Syntax Error:expect.type=" + type + ", actual.type=" + token.type +
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
    _funcdef.push([take("IDENT")]);
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
    return _funcargs;
  };

  const statlist = () => {
    const _statlist = [];
    while (match("IDENT")) {
      _statlist.push(statement());
    }
    return _statlist;
  };

  const statement = () => {
    const _statement = [];
    const name = take("IDENT");
    _statement.push(call_func(name));
    take("SEMICOLON");

    return _statement;
  };

  const call_func = (name) => {
    const _funcall = [];
    _funcall.push($("call_func"));
    _funcall.push([name]);
    take("PARENTHES_OPEN");
    _funcall.push([take("STRING")]);
    take("PARENTHES_CLOSE");

    return _funcall;
  };

  const ast = program();
  return ast;
}
