export function evaluate(text) {
  const tokens = parse(text);
  let r;

  const num1 = parseInt(tokens[0]);
  const num2 = parseInt(tokens[2]);
  const op = tokens[1];
  switch (op) {
    case "+":
      r = num1 + num2;
      break;
    case "-":
      r = num1 - num2;
      break;
    case "*":
      r = num1 * num2;
      break;
    default:
      r = undefined;
  }
  return r.toString();
}

export function parse(text) {
  return text.match(/[^\s]+/g);
}
