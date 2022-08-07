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

  const ast = expr();
  return ast;
}
