import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Interpriter from "./interpriter.js";
import Config from "./config.js";

Config.disable_console();

Deno.test("apply: Hello World", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        print("Hello World");
      }
    `);
  assertEquals(actual, "Hello World");
});

Deno.test("apply: variable", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        msg = "var test.";
        print(msg);
      }
    `);
  assertEquals(actual, "var test.");
});

Deno.test("apply: call-function", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        msg = "var test.";
        say(msg);
      }
      fn say(message) {
        print(message);
      }
      `);
  assertEquals(actual, "var test.");
});

Deno.test("apply: call-function2", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        msg = "start";
        print(msg);

        sum1 = 3 + 4;
        sum2 = calc(1, 2) + sum1;
        print(sum2);

        msg = "done";
        print(msg);
      }

      fn calc(x, y) {
        return x + y;
      }
      `);
  assertEquals(actual, "start\n10\ndone");
});

Deno.test("apply: IF", () => {
  const actual = Interpriter.evaluate(`
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
      `);
  assertEquals(actual, "foo\nalways\nhello");
});

Deno.test("apply: WHILE", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        i = 0;
        while(i<=10){
          print(i);
          i = i + 1;
        }
      }
      `);
  assertEquals(actual, "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
});

Deno.test("apply: WHILE-with-break", () => {
  const actual = Interpriter.evaluate(`
      fn main() {
        i = 0;
        while(true){
          if(10<i){
            break;
          }
          print(i);
          i = i + 1;
        }
      }
    `);
  assertEquals(actual, "0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10");
});

Deno.test("apply: FizzBuzz", () => {
  const actual = Interpriter.evaluate(`
    fn main() {
      fizzbuzz(1, 100);
    }

    fn fizzbuzz(start, end) {
        i = start;
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
    `);
  assertEquals(
    actual,
    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz\n31\n32\nFizz\n34\nBuzz\nFizz\n37\n38\nFizz\nBuzz\n41\nFizz\n43\n44\nFizzBuzz\n46\n47\nFizz\n49\nBuzz\nFizz\n52\n53\nFizz\nBuzz\n56\nFizz\n58\n59\nFizzBuzz\n61\n62\nFizz\n64\nBuzz\nFizz\n67\n68\nFizz\nBuzz\n71\nFizz\n73\n74\nFizzBuzz\n76\n77\nFizz\n79\nBuzz\nFizz\n82\n83\nFizz\nBuzz\n86\nFizz\n88\n89\nFizzBuzz\n91\n92\nFizz\n94\nBuzz\nFizz\n97\n98\nFizz\nBuzz",
  );
});

Deno.test("apply: Fibonacci", () => {
  const actual = Interpriter.evaluate(`
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
    `);
  assertEquals(actual, "55");
});
