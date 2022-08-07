import { $ } from "./util.js";

export function parse(sc) {
  const match = (...type) => {
    let r = false;
    const token = sc.peek();
    for (let i = 0; i < type.length; i++) {
      r |= token != undefined && token.type === type[i];
    }

    return r;
  };

  const take = (...type) => {
    const token = sc.peek();

    let r = false;
    for (let i = 0; i < type.length; i++) {
      r |= token != undefined && token.type === type[i];
    }
    if (!r) {
      throw new Error(
        "Syntax Error:expect.type=" + type + ", actual.type=" + token.type +
          ", token.value=" + token.value,
      );
    }

    sc.next();
    return token;
  };

  const program = () => {
    const _program = [];
    while (match("FUNCDEF")) {
      _program.push(funcdef());
    }
    return _program;
  };

  const funcdef = () => {
    const _funcdef = [];
    _funcdef.push(take("FUNCDEF"));
    _funcdef.push([take("IDENT")]);
    take("PARENTHES_OPEN");
    _funcdef.push(funcargs());
    take("PARENTHES_CLOSE");
    take("BEGIN");
    _funcdef.push(statlist());
    take("END");
    return _funcdef;
  };

  const funcargs = () => {
    const _funcargs = [];
    while (match("INT", "STRING", "BOOL", "IDENT", "COMMA")) {
      if (match("INT", "STRING", "BOOL", "IDENT")) {
        _funcargs.push(expr());
      } else {
        take("COMMA");
      }
    }
    return _funcargs;
  };

  const vardef = () => {
    const _vardef = [];

    _vardef.push(take("VARDEF"));
    _vardef.push([take("IDENT")]);
    take("ASSIGN");
    _vardef.push([expr()]);

    return _vardef;
  };

  const statlist = () => {
    const _statlist = [];
    for (
      let _statement = statement();
      0 < _statement.length;
      _statement = statement()
    ) {
      _statlist.push(_statement);
    }
    return _statlist;
  };

  const statement = () => {
    const _statement = [];

    if (match("VARDEF")) {
      _statement.push(vardef());
      take("SEMICOLON");
    } else if (match("WHILE")) {
      _statement.push(call_while());
    } else if (match("IF")) {
      _statement.push(call_if());
    } else if (match("BREAK")) {
      _statement.push([take("BREAK")]);
      take("SEMICOLON");
    } else if (match("RETURN")) {
      _statement.push([take("RETURN"), expr()]);
      take("SEMICOLON");
    } else if (match("IDENT")) {
      const name = take("IDENT");
      if (match("ASSIGN")) {
        _statement.push(assign(name));
      } else {
        _statement.push(call_func(name));
      }
      take("SEMICOLON");
    }

    return _statement;
  };

  const call_func = (name) => {
    const _funcall = [];
    _funcall.push($("call_func"));
    _funcall.push(name);
    take("PARENTHES_OPEN");
    _funcall.push(funcargs());
    take("PARENTHES_CLOSE");

    return _funcall;
  };

  const assign = (name) => {
    const _assign = [];

    _assign.push(take("ASSIGN"));
    _assign.push([name]);
    _assign.push(expr());

    return _assign;
  };

  const call_while = () => {
    const _while = [];
    _while.push(take("WHILE"));
    take("PARENTHES_OPEN");
    _while.push(relation());
    take("PARENTHES_CLOSE");
    take("BEGIN");
    _while.push(statlist());
    take("END");
    return _while;
  };

  const call_if = () => {
    const _if = [];
    _if.push(take("IF"));
    take("PARENTHES_OPEN");
    _if.push(relation());
    take("PARENTHES_CLOSE");
    take("BEGIN");
    _if.push(statlist());
    take("END");
    if (match("ELSE")) {
      _if.push(take("ELSE"));
      if (match("IF")) {
        _if.push(call_if());
      } else {
        take("BEGIN");
        _if.push(statlist());
        take("END");
      }
    }
    return _if;
  };

  const relation = () => {
    const arg1 = expr();
    if (match("OP_REL")) {
      const op = take("OP_REL");
      const arg2 = expr();
      return [op, arg1, arg2];
    } else {
      return [$("OP_REL", "direct"), arg1];
    }
  };

  const expr = () => {
    let _expr = term();

    while (match("OP_ADD")) {
      switch (take("OP_ADD").value) {
        case "+":
          _expr = [$("add"), _expr, term()];
          break;
        case "-":
          _expr = [$("sub"), _expr, term()];
          break;
      }
    }
    return _expr;
  };

  const term = () => {
    let _term = factor();
    while (match("OP_MUL")) {
      switch (take("OP_MUL").value) {
        case "*":
          _term = [$("mul"), _term, factor()];
          break;
        case "/":
          _term = [$("div"), _term, factor()];
          break;
        case "%":
          _term = [$("mod"), _term, factor()];
          break;
      }
    }
    return _term;
  };

  const factor = () => {
    if (match("PARENTHES_OPEN")) {
      take("PARENTHES_OPEN");
      const _factor = expr();
      take("PARENTHES_CLOSE");

      return _factor;
    }
    return literal();
  };

  const literal = () => {
    const _literal = take("INT", "STRING", "BOOL", "IDENT");
    if (_literal.type == "IDENT" && match("PARENTHES_OPEN")) {
      return call_func(_literal);
    }
    return [_literal];
  };

  const ast = program();
  // console.log(ast[0][3][0])
  // console.log(ast[1][3][0])
  return ast;
}
