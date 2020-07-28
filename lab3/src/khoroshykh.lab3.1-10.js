let outputString;

//lab1: output numbers from 10 to 20
outputString = ``;

for (let i = 10; i <= 20; i++) {
  if (i === 10) {
    outputString = `${i}`;
  } else {
    outputString += `, ${i}`;
  }
}

console.log(outputString);
//lab1 - end
//lab2: output square numbers from 10 to 20
outputString = ``;

for (let i = 10; i <= 20; i++) {
  if (i === 10) {
    outputString = `${i ** 2}`;
  } else {
    outputString += `, ${i ** 2}`;
  }
}

console.log(outputString);
//lab2 - end
//lab3: multiplication table by 7
const factor = 7;

for (let i = 1; i <= 10; i++) {
  console.log(`${i} * ${factor} = ${i * factor}`);
}
//lab3 - end
//lab4: sum from 1 to 15
let sum = 0;

for (let i = 1; i <= 15; i++) {
  sum += i;
}

console.log(`The sum from 1 to 15: ${sum}`);
//lab4 - end
//lab5: product from 15 to 30
let product = 1;

for (let i = 15; i <= 35; i++) {
  product *= i;
}

console.log(`The product from 15 to 35: ${product}`);
//lab5 - end
//lab6: arithmetic mean from 1 to 500
let count = 0;
sum = 0;

for (let i = 1; i <= 500; i++) {
  sum += i;
  count++;
}

console.log(`The arithmetic mean from 1 to 500: ${sum / count}`);
//lab6 - end
//lab7: sum even numbers from 30 to 80
sum = 0;

for (let i = 30; i <= 80; i++) {
  sum += i % 2 ? 0 : i;
}

console.log(`The sum even numbers: ${sum}`);
//lab7 - end
//lab8: numbers from 100 to 200 multiples of 3
outputString = "";

for (let i = 100; i <= 300; i++) {
  if (!(i % 3)) {
    if (outputString) outputString += `, `;
    outputString += i;
  }
}

console.log(outputString);
//lab8 - end
//lab9: dividers
const num = 18;
let countEvenDiv = 0;
let sumEvenDiv = 0;

outputString = "";

for (let i = 1; i <= num; i++) {
  if (!(num % i)) {
    if (outputString) outputString += `, `;
    outputString += i;
    if (!(i % 2)) {
      countEvenDiv++;
      sumEvenDiv += i;
    }
  }
}

console.log(outputString);
console.log(countEvenDiv, sumEvenDiv);
//lab9 - end
//lab10: multiplication table
outputString = "";

for (let i = 1; i <= 10; i++) {
  for (let j = i; j <= 10; j++) {
    if (outputString) outputString += `, `;
    outputString += `${i}*${j}=${i * j}`;
  }
  console.log(outputString);
  outputString = "";
}
//lab10 - end
