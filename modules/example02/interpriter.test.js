import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Interpriter from "./interpriter.js";

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
