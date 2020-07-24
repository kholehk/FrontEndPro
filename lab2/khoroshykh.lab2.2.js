const aValue = prompt("Value a:");
const bValue = prompt("Value b:");
const cValue = prompt("Value c:");
const sumValues = +aValue + +bValue + +cValue;

alert(
  `Sum values ` +
    `a:${aValue}${aValue % 2 ? `` : ` (even)`}, ` +
    `b:${bValue}${bValue % 2 ? `` : ` (even)`}, ` +
    `c:${cValue}${cValue % 2 ? `` : ` (even)`} = ` +
    `${sumValues}`
);

console.log(
  sumValues,
  aValue % 2 ? `` : `a:${aValue} (even)`,
  bValue % 2 ? `` : `b:${bValue} (even)`,
  cValue % 2 ? `` : `c:${cValue} (even)`
);
