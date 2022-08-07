import { $ } from "./util.js";

export class Scanner {
  constructor(text) {
    const tokenize = (word) => {
      switch (true) {
        case word == "fn":
          return $("FUNCDEF", word);
        case word == "(":
          return $("PARENTHES_OPEN", word);
        case word == ")":
          return $("PARENTHES_CLOSE", word);
        case word == "{":
          return $("BEGIN", word);
        case word == "}":
          return $("END", word);
        case word == ";":
          return $("SEMICOLON", word);
        case (/"(.*)"/).test(word):
          return $("STRING", word.match(/"(.*)"/)[1]);
        default:
          return $("IDENT", word);
      }
    };
    const split = (text) => {
      const tokens = [];
      let idx = 0;
      while (idx < text.length) {
        const x = text[idx];
        if ((/"/).test(x)) { // scan-latter
          let str = x;
          idx++;
          for (; (text[idx]) != '"'; idx++) {
            str += text[idx];
          }
          str += '"';
          idx++;
          tokens.push(tokenize(str));
        } else if ((/\d/).test(x)) { // scan-int
          let num = "";
          for (; (/\d/).test(text[idx]); idx++) {
            num += text[idx];
          }
          tokens.push(tokenize(num));
        } else if ((/[a-z]|[A-Z]/).test(x)) { // scan-latter
          let latter = "";
          for (; (/[a-z]|[A-Z]|[0-9]/).test(text[idx]); idx++) {
            latter += text[idx];
          }
          tokens.push(tokenize(latter));
        } else if (x === " " || x === "\n") { // skip
          idx += 1;
        } else {
          tokens.push(tokenize(x));
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
