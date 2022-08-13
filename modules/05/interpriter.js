import { Scanner } from "./scanner.js";
import { Evaluator } from "./evaluator.js";
import * as Parser from "./parser.js";

export function evaluate(text) {
  const sc = new Scanner(text);
  const ast = Parser.parse(sc);
  return new Evaluator().apply(ast).stdout.join("\n");
}
