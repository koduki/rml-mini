import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Evaluator } from "./evaluator.js";
import { $ } from "./util.js";

Deno.test("apply: [add, 1, 2]", () => {
  const actual = new Evaluator().apply([
    $("add"),
    [$("INT", 1)],
    [$("INT", 2)],
  ]);
  assertEquals(actual, 3);
});

Deno.test("apply: [sub, 2, 1]", () => {
  const actual = new Evaluator().apply([
    $("sub"),
    [$("INT", 2)],
    [$("INT", 1)],
  ]);
  assertEquals(actual, 1);
});

Deno.test("apply: [mul, 2, 3]", () => {
  const actual = new Evaluator().apply([
    $("mul"),
    [$("INT", 2)],
    [$("INT", 3)],
  ]);
  assertEquals(actual, 6);
});

Deno.test("apply: [mul, 2, [add, 2, 3]]", () => {
  const actual = new Evaluator().apply([
    $("mul"),
    [$("INT", 2)],
    [$("add"), [$("INT", 2)], [$("INT", 3)]],
  ]);
  assertEquals(actual, 10);
});
