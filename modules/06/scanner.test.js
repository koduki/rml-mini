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
  assertEquals(sc.next(), $("IDENT", "main2"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("STRING", "Hello World"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.is_not_end(), true);
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.is_not_end(), false);
});

Deno.test("Scanner: simple loop", () => {
  const sc = new Scanner(`
    fn main() {
      var i = 0;
      while(true){
        if(10 <= i){
          break;
        }
        print(i);
        i = i + 1;
      }
    }
`);

  assertEquals(sc.peek(), $("FUNCDEF", "fn"));
  assertEquals(sc.next(), $("IDENT", "main"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("VARDEF", "var"));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("ASSIGN", "="));
  assertEquals(sc.next(), $("INT", 0));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("WHILE", "while"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("BOOL", true));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IF", "if"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("INT", 10));
  assertEquals(sc.next(), $("OP_REL", "<="));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("BREAK", "break"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("ASSIGN", "="));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_ADD", "+"));
  assertEquals(sc.next(), $("INT", 1));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("END", "}"));
});

Deno.test("Scanner: fizzbuzz", () => {
  const sc = new Scanner(`
  fn main() {
    fizzbuzz(1, 100)
  }

  fn fizzbuzz(start, end) {
      var i = start;
      while(true){
          if (i < end) {
              break;
          }

          if(i % 15 == 0){
              print("FizzBuzz");
          }else if(i % 3 == 0){
              print("Fizz");
          }else if(i % 5 == 0){
              print("Buzz");
          }else 
              print(i);
          }
          i = i + 1;
      }
  }
`);
  assertEquals(sc.peek(), $("FUNCDEF", "fn"));
  assertEquals(sc.next(), $("IDENT", "main"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IDENT", "fizzbuzz"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("INT", 1));
  assertEquals(sc.next(), $("COMMA", ","));
  assertEquals(sc.next(), $("INT", 100));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("FUNCDEF", "fn"));
  assertEquals(sc.next(), $("IDENT", "fizzbuzz"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "start"));
  assertEquals(sc.next(), $("COMMA", ","));
  assertEquals(sc.next(), $("IDENT", "end"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("VARDEF", "var"));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("ASSIGN", "="));
  assertEquals(sc.next(), $("IDENT", "start"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("WHILE", "while"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("BOOL", true));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IF", "if"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_REL", "<"));
  assertEquals(sc.next(), $("IDENT", "end"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("BREAK", "break"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("IF", "if"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_MUL", "%"));
  assertEquals(sc.next(), $("INT", 15));
  assertEquals(sc.next(), $("OP_REL", "=="));
  assertEquals(sc.next(), $("INT", 0));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("STRING", "FizzBuzz"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("ELSE", "else"));
  assertEquals(sc.next(), $("IF", "if"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_MUL", "%"));
  assertEquals(sc.next(), $("INT", 3));
  assertEquals(sc.next(), $("OP_REL", "=="));
  assertEquals(sc.next(), $("INT", 0));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("STRING", "Fizz"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("ELSE", "else"));
  assertEquals(sc.next(), $("IF", "if"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_MUL", "%"));
  assertEquals(sc.next(), $("INT", 5));
  assertEquals(sc.next(), $("OP_REL", "=="));
  assertEquals(sc.next(), $("INT", 0));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("BEGIN", "{"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("STRING", "Buzz"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("ELSE", "else"));
  assertEquals(sc.next(), $("IDENT", "print"));
  assertEquals(sc.next(), $("PARENTHES_OPEN", "("));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("PARENTHES_CLOSE", ")"));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("ASSIGN", "="));
  assertEquals(sc.next(), $("IDENT", "i"));
  assertEquals(sc.next(), $("OP_ADD", "+"));
  assertEquals(sc.next(), $("INT", 1));
  assertEquals(sc.next(), $("SEMICOLON", ";"));
  assertEquals(sc.next(), $("END", "}"));
  assertEquals(sc.next(), $("END", "}"));
});
