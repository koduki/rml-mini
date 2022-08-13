import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";
import { show_tree } from "./util.js";

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
      [],
      [
        [
          [
            { type: "call_func", value: null },
            { type: "IDENT", value: "print" },
            [[{ type: "STRING", value: "Hello World" }]],
          ],
        ],
      ],
    ],
  ]);
});

Deno.test("parse: FizzBuzz", () => {
  const actual = Parser.parse(
    new Scanner(`
      fn main() {
        fizzbuzz(1, 100);
      }

      fn fizzbuzz(start, end) {
          i = start;
          while(true){
            if (i < end) {
              break;
            }

            if(i % 15 == 0){
                print("FizzBuzz");
            }else if(i % 3 == 0){
                print("Fizz");
            }else if(i % 5 == 0){
                print("Buzz");
            }else {
                print(i);
            }

            i = i + 1;
          }
      }
    `),
  );
  // show_tree(actual);
});
