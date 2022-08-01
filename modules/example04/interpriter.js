import { Scanner } from "./scanner.js";
import { Evaluator } from "./evaluator.js";
import { $ } from "./util.js";

export function evaluate(text) {
  const sc = new Scanner(text);

  const expr = () => {
    let x = term();
    for (let token = sc.peek(); sc.is_not_end(); token = sc.peek()) {
      if (token.type == "ADD_OP") {
        switch (token.value) {
          case "+":
            sc.next();
            x = [$("add"), x, term()];
            break;
          case "-":
            sc.next();
            x = [$("sub"), x, term()];
            break;
        }
      } else {
        return x;
      }
    }
    return x;
  };

  const term = () => {
    let x = factor();
    for (let token = sc.peek(); sc.is_not_end(); token = sc.peek()) {
      if (token.type == "MUL_OP") {
        switch (token.value) {
          case "*":
            sc.next();
            x = [$("mul"), x, factor()];
            break;
          case "/":
            sc.next();
            x = [$("div"), x, factor()];
            break;
        }
      } else {
        return x;
      }
    }
    return x;
  };

  const factor = () => {
    if (sc.peek().type === "PARENTHES") {
      sc.next();
      const r = expr();
      sc.next();

      return r;
    }
    return number();
  };

  const number = () => {
    const r = sc.peek();
    sc.next();
    return [r];
  };

  const ast = expr();
  return new Evaluator().apply(ast).toString();
}
