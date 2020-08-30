"use strict";

const BLUE = 'rgb(0, 0, 255)';
const GREEN = 'rgb(0, 255, 0)';
const YELLOW = 'rgb(255, 255, 0)';
const colors = [BLUE, GREEN, YELLOW];
const countersItem = document.querySelectorAll(".counters_item");

if (countersItem.length) { 

   for (let elem of countersItem) {
      elem.addEventListener("click", bgColorOnClick);
      // console.log(elem);
   }
}

function bgColorOnClick(event) { 

   const elem = event.target.matches(".counters_item")
      ? event.target
      : event.target.parentNode;

   let indexColor = colors.findIndex(color => color === elem.style.backgroundColor);

   indexColor = ++indexColor >= colors.length ? indexColor = 0 : indexColor;
   elem.style.backgroundColor = colors[indexColor];
}