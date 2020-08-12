"use strict";

const point = {
   x: 0,
   y: 0,
}

const metric = {
   length: undefined,
   degree: undefined,
}

function copy(target, source) { 

   if (typeof source !== "object" || typeof target !== "object") return undefined;

   for (let key in source) {
      target[key] = source[key];
   }

   return target;
}

console.log("Point:", point);

const startPoint = copy(point, { x: 10, y: -7 });
console.log("Start:", startPoint);

const vector = copy(copy({}, startPoint), metric);
console.log("Vector:", vector);

const myDirect = copy(vector, {length:100, degree: 45, color: "ff0000"});
console.log("Direction", myDirect);

function isEqual(objL, objR) {

   if (Object.keys(objL).length !== Object.keys(objR).length) return false;

   for (let key in objL) { 
      if (!(key in objR) || objL[key] !== objR[key]) {
         return false;
      }
   }

   return true;
}

console.log(startPoint, myDirect, isEqual(startPoint, myDirect));
console.log(myDirect, vector, isEqual(myDirect, vector));

function getStrStat(string) {
   const result = {};

   for (let char of string) {
      result[char] = result[char] === undefined ? 1 : ++result[char];
   }

   return result;
}

console.log(getStrStat("aaAbbc dDDdd-e_11"));