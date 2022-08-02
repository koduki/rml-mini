fn main() {
    print("Hello World")
}

fn main() {
    print("Hello World")
}



fn hoge():int {
    var x:int = 1;
    x = 2 + 3;
    return x
}

[
    ["funcdef", "main", "void",
        ["funccall", "print", "'Hello World'"]
    ],
    ["funcdef", "hoge", "int",
        ["var", "x", "int", 1],
        ["set", "x", ["add", 2, 3]],
        ["return", "x"],
    ],
]

<program>  --> <function>+
<function> --> "fn" <ident>"(" (<ident>:<ident>)* ")":<ident>"{" <statlist> "}"
<funccall> --> <ident> "(" <expression> ")"
<statlist> --> <statement>(; <statement>)*
<statement> --> <funccall>
// <block> --> {} <statlist> end
<relation> --> <expression> <rel_op> <expression>
<rel_op> --> > | < | = | <>| <= | >= |
<expression> --> <expression> <add_op> <term> | <term>
<term> --> <term> <mul_op> <factor> | <factor>
<factor> --> <literal> | "(" <expression> ")" | <funccall>
<literal> --> <ident> | <number> | <string>
<number> --> [<unary_op>] NUMBER
<unary_op> --> + | -
<add_op> --> + | -
<mul_op> --> * | / | %
<string> --> "<any charactor>"
<indent> --> <latter>(<latter> | <digit>)*
<latter> --> a-zA-Z
<digit> --> 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9