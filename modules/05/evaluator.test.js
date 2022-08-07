import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Evaluator } from "./evaluator.js";
import { $ } from "./util.js";

Deno.test("apply: hello world", () => {
  const actual = new Evaluator().apply([
    [
      { type: "FUNCDEF", value: "fn" },
      [{ type: "IDENT", value: "main" }],
      [[{ type: "IDENT", value: null }]],
      [
        [
          [
            { type: "funccall", value: null },
            [{ type: "IDENT", value: "print" }],
            [{ type: "STRING", value: "Hello World" }],
          ],
        ],
      ],
    ],
  ]);

  assertEquals(actual.stdout[0], "Hello World");
});
