export function evaluate(text) {
  const sc = new Scanner(text);

  let r;
  const num1 = parseInt(sc.peek());
  const op = sc.next();
  const num2 = parseInt(sc.next());
  switch (op) {
    case "+":
      r = num1 + num2;
      break;
    case "-":
      r = num1 - num2;
      break;
    case "*":
      r = num1 * num2;
      break;
    case "/":
      r = num1 / num2;
      break;
    default:
      r = undefined;
  }
  return r.toString();
}

export class Scanner {
  constructor(text) {
    this.tokens = text.trim().split(/ /);
    this.pos = 0;
  }
  peek() {
    return this.tokens[this.pos];
  }
  next() {
    this.pos += 1;
    return this.tokens[this.pos];
  }
}
