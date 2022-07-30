import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Interpriter from "./interpriter.js";

Deno.test("Scanner: 1+10", () => {
  const sc = new Interpriter.Scanner("1+10");

  assertEquals(sc.has_next(), true);
  assertEquals(sc.next(), "1");
  assertEquals(sc.next(), "+");
  assertEquals(sc.next(), "10");
  assertEquals(sc.has_next(), false);
  assertEquals(sc.next(), null);
  assertEquals(sc.has_next(), false);
});

Deno.test("Scanner: 1+ 10 * 3", () => {
  const sc = new Interpriter.Scanner("1+ 10 * 3");

  assertEquals(sc.next(), "1");
  assertEquals(sc.next(), "+");
  assertEquals(sc.next(), "10");
  assertEquals(sc.next(), "*");
  assertEquals(sc.next(), "3");
  assertEquals(sc.next(), null);
});

Deno.test("Scanner: (1+ 10) * 3 -2 / 4", () => {
  const sc = new Interpriter.Scanner("(1+ 10) * 3 -2 / 4");

  assertEquals(sc.next(), "(");
  assertEquals(sc.next(), "1");
  assertEquals(sc.next(), "+");
  assertEquals(sc.next(), "10");
  assertEquals(sc.next(), ")");
  assertEquals(sc.next(), "*");
  assertEquals(sc.next(), "3");
  assertEquals(sc.next(), "-");
  assertEquals(sc.next(), "2");
  assertEquals(sc.next(), "/");
  assertEquals(sc.next(), "4");
  assertEquals(sc.next(), null);
});

Deno.test("evaluate: 1 + 1 = 2", () => {
  const actual = Interpriter.evaluate("1 + 1");
  assertEquals(actual, "2");
});

Deno.test("evaluate: 10 - 30 = -20", () => {
  const actual = Interpriter.evaluate("10 - 30 ");
  assertEquals(actual, "-20");
});

Deno.test("evaluate: 3 * 3 = 9", () => {
  const actual = Interpriter.evaluate("3 * 3");
  assertEquals(actual, "9");
});

Deno.test("evaluate: 1 + 2 + 3 = 6", () => {
  const actual = Interpriter.evaluate("1 + 2 + 3");
  assertEquals(actual, "6");
});
