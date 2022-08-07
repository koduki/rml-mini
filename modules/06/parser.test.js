import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";
import { show_tree } from "./util.js";

// Deno.test("parse: Hello World", () => {
//   const actual = Parser.parse(
//     new Scanner(`
//     fn main() {
//       print("Hello World");
//     }
//   `),
//   );
//   assertEquals(actual, [
//     [
//       { type: "FUNCDEF", value: "fn" },
//       [{ type: "IDENT", value: "main" }],
//       [],
//       [
//         [
//           [
//             { type: "funccall", value: null },
//             [{ type: "IDENT", value: "print" }],
//             [{ type: "STRING", value: "Hello World" }],
//           ],
//         ],
//       ],
//     ],
//   ]);
// });

// Deno.test("parse: FizzBuzz", () => {
//   const actual = Parser.parse(
//     new Scanner(`
//       fn main() {
//         fizzbuzz(1, 100);
//       }

//       fn fizzbuzz(start, end) {
//           var i = start;
//           while(true){
//             if (i < end) {
//               break;
//             }

//             if(i % 15 == 0){
//                 print("FizzBuzz");
//             }else if(i % 3 == 0){
//                 print("Fizz");
//             }else if(i % 5 == 0){
//                 print("Buzz");
//             }else {
//                 print(i);
//             }

//             i = i + 1;
//           }
//       }
//     `),
//   );

Deno.test("parse: FuncCall", () => {
  const actual = Parser.parse(
    new Scanner(`
      fn main() {
        print(calc(1, 10));
      }

      fn calc(x, y) {
          return x + y;
      }
    `),
  );
  show_tree(actual);
  // console.log(actual)
  // assertEquals(actual, [
  //   [
  //     { type: "FUNCDEF", value: "fn" },
  //     [{ type: "IDENT", value: "main" }],
  //     [[{ type: "IDENT", value: null }]],
  //     [
  //       [
  //         [
  //           { type: "funccall", value: null },
  //           [{ type: "IDENT", value: "print" }],
  //           [{ type: "STRING", value: "Hello World" }],
  //         ],
  //       ],
  //     ],
  //   ],
  // ]);
});