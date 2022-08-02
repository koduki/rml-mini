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
      [{ type: "INDENT", value: "main" }],
      [[{ type: "INDENT", value: null }]],
      // [{ type: "INDENT", value: "void" }],
      [
        [
          [
            { type: "funccall", value: null },
            [{ type: "INDENT", value: "print" }],
            [{ type: "STRING", value: "Hello World" }],
          ],
        ],
      ],
    ],
  ]);
});

// [
//   [$("FUNCDEF"), [$("INDENT", "main")], [$("INDENT", null)], [$("INDENT", "void")],
//       ["funccall", "print", "'Hello World'"]
//   ],
//   ["funcdef", "hoge", "int",
//       ["var", "x", "int", 1],
//       ["set", "x", ["add", 2, 3]],
//       ["return", "x"],
//   ],
// ]

// [
//   { type: "FUNCDEF", value: "fn" },
//   { type: "INDENT", value: "main" },
//   { type: "PARENTHES_OPEN", value: "(" },
//   { type: "PARENTHES_CLOSE", value: ")" },
//   { type: "COLON", value: ":" },
//   { type: "INDENT", value: "void" },
//   { type: "BEGIN", value: "{" },
//   { type: "INDENT", value: "print" },
//   { type: "PARENTHES_OPEN", value: "(" },
//   { type: "STRING", value: '"Hello World"' },
//   { type: "PARENTHES_CLOSE", value: ")" },
//   { type: "SEMICOLON", value: ";" },
//   { type: "END", value: "}" }
// ]

// Deno.test("parse: 1 + 2 - 3", () => {
//   const actual = Parser.parse(new Scanner("1 + 2 - 3"));
//   assertEquals(actual, [
//     $("sub"),
//     [$("add"), [$("INT", 1)], [$("INT", 2)]],
//     [$("INT", 3)],
//   ]);
// });

// Deno.test("parse: 1 + 2 * 3", () => {
//   const actual = Parser.parse(new Scanner("1 + 2 * 3"));
//   assertEquals(actual, [
//     $("add"),
//     [$("INT", 1)],
//     [$("mul"), [$("INT", 2)], [$("INT", 3)]],
//   ]);
// });

// Deno.test("parse: (1 + 2) * 3", () => {
//   const actual = Parser.parse(new Scanner("(1 + 2) * 3"));
//   assertEquals(actual, [
//     $("mul"),
//     [$("add"), [$("INT", 1)], [$("INT", 2)]],
//     [$("INT", 3)],
//   ]);
// });
