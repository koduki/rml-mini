import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Interpriter from "./interpriter.js";

Deno.test("eval: Hello World", () => {
  const actual = Interpriter.evaluate(`
        fn main() {
            print("Hello World");
        }
      `);
  assertEquals(actual, "Hello World");
});

Deno.test("eval: Hello World2", () => {
  const actual = Interpriter.evaluate(`
        fn main() {
            print("Hello World1");
            print("Hello World2");
        }
      `);
  assertEquals(actual, "Hello World1\nHello World2");
});
