import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Scanner } from "./scanner.js";
import { $ } from "./util.js";

Deno.test("Scanner: 1+10", () => {
  const sc = new Scanner("1+10");

  assertEquals(sc.is_not_end(), true);
  assertEquals(sc.peek(), $("INT", 1));
  assertEquals(sc.next(), $("ADD_OP", "+"));
  assertEquals(sc.is_not_end(), true);
  assertEquals(sc.next(), $("INT", 10));
  assertEquals(sc.is_not_end(), false);
});

Deno.test("Scanner: 1+ 10 * 3", () => {
  const sc = new Scanner("1+ 10 * 3");

  assertEquals(sc.peek(), $("INT", 1));
  assertEquals(sc.next(), $("ADD_OP", "+"));
  assertEquals(sc.next(), $("INT", 10));
  assertEquals(sc.next(), $("MUL_OP", "*"));
  assertEquals(sc.next(), $("INT", 3));
});

Deno.test("Scanner: (1+ 10) * 3 -2 / 4", () => {
  const sc = new Scanner("(1+ 10) * 3 -2 / 4");

  assertEquals(sc.peek(), $("PARENTHES", "("));
  assertEquals(sc.next(), $("INT", 1));
  assertEquals(sc.next(), $("ADD_OP", "+"));
  assertEquals(sc.next(), $("INT", 10));
  assertEquals(sc.next(), $("PARENTHES", ")"));
  assertEquals(sc.next(), $("MUL_OP", "*"));
  assertEquals(sc.next(), $("INT", 3));
  assertEquals(sc.next(), $("ADD_OP", "-"));
  assertEquals(sc.next(), $("INT", 2));
  assertEquals(sc.next(), $("MUL_OP", "/"));
  assertEquals(sc.next(), $("INT", 4));
});
