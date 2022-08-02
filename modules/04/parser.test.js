import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import * as Parser from "./parser.js";
import { Scanner } from "./scanner.js";
import { $ } from "./util.js";

Deno.test("parse: 1 + 2", () => {
  const actual = Parser.parse(new Scanner("1 + 2"));
  assertEquals(actual, [$("add"), [$("INT", 1)], [$("INT", 2)]]);
});

Deno.test("parse: 1 + 2 - 3", () => {
  const actual = Parser.parse(new Scanner("1 + 2 - 3"));
  assertEquals(actual, [
    $("sub"),
    [$("add"), [$("INT", 1)], [$("INT", 2)]],
    [$("INT", 3)],
  ]);
});

Deno.test("parse: 1 + 2 * 3", () => {
  const actual = Parser.parse(new Scanner("1 + 2 * 3"));
  assertEquals(actual, [
    $("add"),
    [$("INT", 1)],
    [$("mul"), [$("INT", 2)], [$("INT", 3)]],
  ]);
});

Deno.test("parse: (1 + 2) * 3", () => {
  const actual = Parser.parse(new Scanner("(1 + 2) * 3"));
  assertEquals(actual, [
    $("mul"),
    [$("add"), [$("INT", 1)], [$("INT", 2)]],
    [$("INT", 3)],
  ]);
});
