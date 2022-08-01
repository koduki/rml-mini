export const $ = (type, value = null) => {
  return { type: type, value: value };
};

export class Scanner {
  constructor(text) {
    const split = (text) => {
      const tokens = [];
      let idx = 0;
      while (idx < text.length) {
        const x = text[idx];
        if (x === " ") { // skip
          idx += 1;
        } else if ((/\d/).test(x)) { // scan-int
          let num = "";
          for (; (/\d/).test(text[idx]); idx++) {
            num += text[idx];
          }
          tokens.push($("INT", parseInt(num)));
        } else if (x === "+" || x === "-") {
          tokens.push($("ADD_OP", x));
          idx += 1;
        } else if (x === "*" || x === "/") {
          tokens.push($("MUL_OP", x));
          idx += 1;
        } else if (x === "(" || x === ")") {
          tokens.push($("PARENTHES", x));
          idx += 1;
        }
      }
      return tokens;
    };

    this.tokens = split(text);
    this.pos = 0;
  }

  is_not_end() {
    return this.pos < this.tokens.length - 1;
  }
  next() {
    this.pos += 1;
    return this.tokens[this.pos];
  }
  peek() {
    return this.tokens[this.pos];
  }
}
