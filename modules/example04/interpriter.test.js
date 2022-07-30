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

Deno.test("evaluate: 1 + 2 + 3 = 6", () => {
  const actual = Interpriter.evaluate("1 + 2 + 3");
  assertEquals(actual, "6");
});

Deno.test("evaluate: 1 * 2 + 3 = 5", () => {
  const actual = Interpriter.evaluate("1 * 2 + 3");
  assertEquals(actual, "5");
});

Deno.test("evaluate: 1 + 2 * 3 = 7", () => {
  const actual = Interpriter.evaluate("1 + 2 * 3");
  assertEquals(actual, "7");
});

Deno.test("evaluate: (1 + 2) * 3 = 9", () => {
  const actual = Interpriter.evaluate("(1+2)*3");
  assertEquals(actual, "9");
});
