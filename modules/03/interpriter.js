import { Scanner } from "./scanner.js";

export function evaluate(text) {
  const sc = new Scanner(text);

  const expr = () => {
    let x = term();
    for (let token = sc.peek(); sc.is_not_end(); token = sc.peek()) {
      switch (token) {
        case "+":
          sc.next();
          x += term();
          break;
        case "-":
          sc.next();
          x -= term();
          break;
        default:
          return x;
      }
    }
    return x;
  };

  const term = () => {
    let x = factor();
    for (let token = sc.peek(); sc.is_not_end(); token = sc.peek()) {
      switch (token) {
        case "*":
          sc.next();
          x *= factor();
          break;
        case "/":
          sc.next();
          x /= factor();
          break;
        default:
          return x;
      }
    }
    return x;
  };

  const factor = () => {
    if (sc.peek() === "(") {
      sc.next();
      const r = expr();
      if (sc.peek() === ")") {
        sc.next();
      }
      return r;
    }
    return number();
  };

  const number = () => {
    const r = sc.peek();
    sc.next();
    return parseInt(r);
  };

  return expr().toString();
}
