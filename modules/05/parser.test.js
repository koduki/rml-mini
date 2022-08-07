import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";

Deno.test("parse: Hello World", () => {
  const actual = Parser.parse(
    new Scanner(`
    fn main() {
      print("Hello World");
    }
  `),
  );
  assertEquals(actual, [
    [
      { type: "FUNCDEF", value: "fn" },
      [{ type: "IDENT", value: "main" }],
      [[{ type: "IDENT", value: null }]],
      [
        [
          [
            { type: "call_func", value: null },
            [{ type: "IDENT", value: "print" }],
            [{ type: "STRING", value: "Hello World" }],
          ],
        ],
      ],
    ],
  ]);
});
