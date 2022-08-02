export function evaluate(text) {
  return text.match(/"(.*)"/)[1];
}
