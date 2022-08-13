import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Evaluator } from "./evaluator.js";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";
import Config from "./config.js";

Config.disable_console();

Deno.test("apply: Hello World", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        print("Hello World");
      }
    `),
  ));
  assertEquals("print" in actual.func_table, true);
  assertEquals("main" in actual.func_table, true);
  assertEquals(Object.keys(actual.var_table).length, 0);
  assertEquals(actual.stdout, ["Hello World"]);
});

Deno.test("apply: VAR", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        var msg = "var test.";
        print(msg);
      }
    `),
  ));
  assertEquals("print" in actual.func_table, true);
  assertEquals("main" in actual.func_table, true);
  assertEquals(Object.keys(actual.var_table).length, 0);
  assertEquals(actual.stdout, ["var test."]);
});
