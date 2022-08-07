import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Evaluator } from "./evaluator.js";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";
import { $ } from "./util.js";

// Deno.test("apply: hello world", () => {
//   const actual = new Evaluator().apply([
//     [
//       { type: "FUNCDEF", value: "fn" },
//       [{ type: "IDENT", value: "main" }],
//       [[{ type: "IDENT", value: null }]],
//       [
//         [
//           [
//             { type: "call_func", value: null },
//             [{ type: "IDENT", value: "print" }],
//             [{ type: "STRING", value: "Hello World" }],
//           ],
//         ],
//       ],
//     ],
//   ]);

//   assertEquals(actual.stdout[0], "Hello World");
// });

Deno.test("apply: Hello World", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        print("Hello World");
      }
    `),
  ));
  // assertEquals(actual, 3);
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
  // assertEquals(actual, 3);
});

Deno.test("apply: call-function", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        var msg = "var test.";
        say(msg);
      }
      fn say(message) {
        print(message);
      }
    `),
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: call-function2", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        var msg = "start";
        print(msg);

        var sum1 = 3 + 4;
        var sum2 = calc(1, 2) + sum1;
        print(sum2);

        msg = "done";
        print(msg);
      }

      fn calc(x, y) {
        return x + y;
      }
    `),
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: IF", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        if( 0 < 1){
          print("foo");
        }else{
          print("bar");
        }

        if(true){
          print("always");
        }

        if( false ){
          print("never");
        }else if(1 < 3){
          print("hello");
        }else{
          print("world");
        }
      }
    `),
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: WHILE", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        var i = 0;
        while(i<=10){        
          print(i);
          i = i + 1;
        }
      }
    `),
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: WHILE-with-break", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
      fn main() {
        var i = 0;
        while(true){
          if(10<i){
            break;
          }        
          print(i);
          i = i + 1;
        }
      }
    `),
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: FizzBuzz", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
    fn main() {
      fizzbuzz(1, 100);
    }

    fn fizzbuzz(start, end) {
        var i = start;
        while(i<=100){
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
  ));
  // assertEquals(actual, 3);
});

Deno.test("apply: Fibonacci", () => {
  const actual = new Evaluator().apply(Parser.parse(
    new Scanner(`
    fn main() {
      print(fib(10));
    }

    fn fib(n) {
      if(n == 0){
        return 0;
      }else if (n==1){
        return 1;
      }else {
        return fib(n - 1) + fib(n - 2);
      }
    }
    `),
  ));
  // assertEquals(actual, 3);
});
