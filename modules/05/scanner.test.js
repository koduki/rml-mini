import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Scanner } from "./scanner.js";
import { $ } from "./util.js";

Deno.test("Scanner: hello wolrd", () => {
  const sc = new Scanner(`
    fn main2() {
      print("Hello World");
    }
`);
  assertEquals(sc.is_not_end(), true);

  assertEquals(sc.peek(), $("FUNCDEF", "fn"));
  assertEquals(sc.next(), $("INDENT", "main2"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("INDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("STRING", "Hello World"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.is_not_end(), true);
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.is_not_end(), false);
});
