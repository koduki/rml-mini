export class Evaluator {
  constructor() {
  }

  apply(ast) {
    const token = ast.shift();
    switch (token.type) {
      case "add": {
        return this.apply(ast.shift()) + this.apply(ast.shift());
      }
      case "sub": {
        return this.apply(ast.shift()) - this.apply(ast.shift());
      }
      case "mul": {
        return this.apply(ast.shift()) * this.apply(ast.shift());
      }
      case "div": {
        return this.apply(ast.shift()) / this.apply(ast.shift());
      }
      case "INT":
        return token.value;
    }

    return "";
  }
}
