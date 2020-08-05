"use strict";

const arrBrand = ["Apple", "Samsung", "Xiaomi", "Huawei", "Motorola", "Lenovo"];

function forEach(array, action) {
   for (let i = 0; i < array.length; i++) {
      action(array[i]);
   }
}

forEach(arrBrand, console.log);

function map(array, action) {
   const arrOut = [];
   let item;

   for (item of array) 
      arrOut.push(action(item));
   
   return arrOut;
}

function CAPS(string) {
   return string.toUpperCase();
}

console.log(map(arrBrand, CAPS));

function find(array, action) {
   const arrOut = [];
   let item;

   for (item of array)
      if (action(item))
         arrOut.push(item);
   
   return arrOut;
}

console.log(find(arrBrand, (string) => string.length === 6));

function some(array, action) { 
   let item;

   for (item of array)
      if (action(item))
         return true;
   
   return false;
}

const someBrand = "apple";
 
let msgString = some(map(arrBrand, CAPS), (string) => string === someBrand)
   ? `Good, ${someBrand} is present.`
   : `Sorry, ${someBrand} is absent.`;

console.log(msgString);

function every(array, action) { 
   let item;

   for (item of array)
      if (!(action(item)))
         return false;
   
   return true;
}

console.log(every(arrBrand, (string) => string.length !== 6));
console.log(every(map(arrBrand, (string) => string.length !== 6), (string) => string.length !== 6));
