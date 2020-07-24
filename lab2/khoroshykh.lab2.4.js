const someInt = 50327;

console.log(
  `${someInt} ` +
    `${Math.floor(someInt / 10000)} ` +
    `${Math.floor(someInt / 1000) % 10} ` +
    `${Math.floor(someInt / 100) % 10} ` +
    `${Math.floor(someInt / 10) % 10} ` +
    `${someInt % 10}`
);
