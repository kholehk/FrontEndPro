'use strict';
const x = 10;
const y = 3;
const action = "^";

console.log(`${x} ${action} ${y} = ${calc(x, y, action)}`);

function calc(x, y, action) {
  switch (action) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "/":
      return x / y;
    case "%":
      return x % y;
    case "^":
      return Math.pow(x, y);
    default:
      return;
  }
}
