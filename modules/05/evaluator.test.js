import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Evaluator } from "./evaluator.js";
import Config from "./config.js";

Config.disable_console();

Deno.test("apply: Hello World", () => {
  const actual = new Evaluator().apply([
    [
      { type: "FUNCDEF", value: "fn" },
      [{ type: "IDENT", value: "main" }],
      [],
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

  assertEquals("print" in actual.func_table, true);
  assertEquals("main" in actual.func_table, true);
  assertEquals(actual.stdout, ["Hello World"]);
});
