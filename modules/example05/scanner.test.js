import { assertEquals } from "https://deno.land/std@0.94.0/testing/asserts.ts";
import { Scanner } from "./scanner.js";

Deno.test("Scanner: 1+10", () => {
  const sc = new Scanner("1+10");

  assertEquals(sc.is_not_end(), true);
  assertEquals(sc.peek(), "1");
  sc.next();
  assertEquals(sc.peek(), "+");
  sc.next();

  assertEquals(sc.is_not_end(), false);
  assertEquals(sc.peek(), "10");
  sc.next();
  assertEquals(sc.is_not_end(), false);
});

Deno.test("Scanner: 1+ 10 * 3", () => {
  const sc = new Scanner("1+ 10 * 3");

  assertEquals(sc.peek(), "1");
  sc.next();
  assertEquals(sc.peek(), "+");
  sc.next();
  assertEquals(sc.peek(), "10");
  sc.next();
  assertEquals(sc.peek(), "*");
  sc.next();
  assertEquals(sc.peek(), "3");
  sc.next();
});

Deno.test("Scanner: (1+ 10) * 3 -2 / 4", () => {
  const sc = new Scanner("(1+ 10) * 3 -2 / 4");

  assertEquals(sc.peek(), "(");
  sc.next();
  assertEquals(sc.peek(), "1");
  sc.next();
  assertEquals(sc.peek(), "+");
  sc.next();
  assertEquals(sc.peek(), "10");
  sc.next();
  assertEquals(sc.peek(), ")");
  sc.next();
  assertEquals(sc.peek(), "*");
  sc.next();
  assertEquals(sc.peek(), "3");
  sc.next();
  assertEquals(sc.peek(), "-");
  sc.next();
  assertEquals(sc.peek(), "2");
  sc.next();
  assertEquals(sc.peek(), "/");
  sc.next();
  assertEquals(sc.peek(), "4");
  sc.next();
});
