"use strict";

function createSum() { 
   let result = 0;

   function sum(n) { 
      return result += n;
   }

   return sum;
}

const mySum = createSum();

console.log(mySum(5));
console.log(mySum(20));
console.log(mySum(120));