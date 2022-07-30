export function evaluate(text) {
  const sc = new Scanner(text);
  const number = () => parseInt(sc.next());
  const expr = () => {
    let x = number();
    while (true) {
      const op = sc.next();
      if (op != null) {
        switch (op) {
          case "+":
            x += number();
            continue;
          case "-":
            x -= number();
            continue;
          case "*":
            x *= number();
            continue;
          case "/":
            x /= number();
            continue;
        }
      } else {
        break;
      }
    }
    return x;
  };

  return expr().toString();
}

export class Scanner {
  constructor(text) {
    this.text = text;
    this.pos = 0;
  }

  has_next() {
    return this.pos < this.text.length;
  }
  next() {
    const is_number = (c) => (/\d+/).test(c);
    const is_op = (c) => (/[\+\-\*\/]/).test(c);
    const is_factor = (c) => (/[\(\)/]/).test(c);

    let r = null;
    let i;
    for (i = this.pos; i < this.text.length; i++) {
      if (this.text[i] === " ") {
        continue;
      } else if (is_number(this.text[i])) {
        r = (r ?? "") + this.text[i];
      } else if (is_op(this.text[i]) || is_factor(this.text[i])) {
        if (r == null) {
          r = this.text[i];
        } else {
          i -= 1;
        }
        break;
      } else {
        r = null;
      }
    }
    this.pos = i + 1;

    return r;
  }
}
