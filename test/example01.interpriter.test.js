import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Interpriter from "../modules/example01/interpriter.js";

Deno.test("evaluate #1", () => {
  const actual = Interpriter.evaluate('puts "Hello World"');
  assertEquals(actual, "Hello World");
});
Deno.test("evaluate #2", () => {
  const actual = Interpriter.evaluate('puts "Hello World2"');
  assertEquals(actual, "Hello World2");
});
