"use strict";

function isSymbolPresentInString(str, symbol) { 
   if (typeof str !== "string") return undefined;

   for (let char of str) { 
      if (char === symbol) return true;
   }

   return false;
}

console.log("abc", "b", isSymbolPresentInString("abc", "b"));
console.log("abc", "d", isSymbolPresentInString("abc", "d"));

function getSymbolIndex(str, symbol) {
   if (typeof str !== "string") return undefined;

   for (let i = 0; i < str.length; i++) { 
      if (str[i] === symbol) return i;
   }

   return -1;
}

console.log(getSymbolIndex("hello, lol", "h"));
console.log(getSymbolIndex("hello, lol", "l"));
console.log(getSymbolIndex("hello, lol", "v"));

function getNumberOfEven(n) {
   if (Number.isNaN(+n)) return undefined;

   const nStr = String(n);
   let counter = 0;

   for (let digit of nStr) {
      counter += (Number.isNaN(+digit) || +digit % 2) ? 0 : 1;
   }

   return counter;
}

const number = -5661.23;
console.log(number, getNumberOfEven(number));

function isObject(a) { 
   return typeof a === "object" && a !== null && !Array.isArray(a);
}

function isEqualDeep(cmpL, cmpR) {
   if (typeof cmpL !== typeof cmpR) return false;

   if (Array.isArray(cmpL)) {
      if (cmpL.length !== cmpR.length) return false;

      for (let i = 0; i < cmpL.length; i++) { 
         if (!isEqualDeep(cmpL[i], cmpR[i])) return false;
      }

   } else if (isObject(cmpL)) {
      if (Object.keys(cmpL).length !== Object.keys(cmpR).length) return false;

      for (let key in cmpL) {
         if (!isEqualDeep(cmpL[key], cmpR[key])) return false;
      }

   } else { 
      if (cmpL !== cmpR) return false;
   }

   return true;
}

const a = { 
   id: 1,
   name: "Peter",
   job: "Actor",
   children: [
      { name: "Max", birthDay: "05.08.1998" },
      { name: "Eva", birthDay: "25.06.2002" }
   ]
}

const b = {
   id: 1,
   name: "Peter",
   job: "Actor",
   children: [
      { name: "Max", birthDay: "05.08.1998" },
      { name: "Eva", birthDay: "25.06.2002" }
   ]
}

console.log(a, b, isEqualDeep(a, b));