"use strict";

const LIST_FORMATS = ["HH:mm:ss", "HH:mm:ss/12", "mm:ss", "ss", "HH:ss/12"];
const amountClocksDiv = 10;
let clockFormat = LIST_FORMATS[0];

const container = document.querySelector(".container");

const label = document.createElement("label");
label.innerText = "Select times format: ";

const select = document.createElement("select");
LIST_FORMATS.forEach(element => {
   let option = document.createElement("option");
   option.text = element;
   select.appendChild(option);
});
select.addEventListener("change", event => clockFormat = event.target.value);

label.appendChild(select);
container.appendChild(label);

const clock = document.createElement("div");
clock.classList.add("clock");
for (let i = 0; i < amountClocksDiv; i++) { 
   clock.appendChild(document.createElement("div"));
}
container.appendChild(clock);

const timerID = window.setInterval(() => {
   const time = getTime(new Date());

   // console.clear();
   // console.log(time);
   changeTimeOnClock(time);
}, 1000);

function getTime(date) {
   const ampm = +clockFormat.split("/")[1] || 24;
   let hour = +date.getHours();
   const tail = ampm - 12 ? "" : (hour < 12 ? "AM" : "PM");
   hour = hour >= ampm ? hour - ampm : hour;
   hour = hour < 10 ? "0" + hour : hour; 
   hour = /HH/.test(clockFormat) ? hour : "__";

   let min = +date.getMinutes();
   min = min < 10 ? "0" + min : min;
   min = /mm/.test(clockFormat) ? min : "__";

   let sec = +date.getSeconds();
   sec = sec < 10 ? "0" + sec : sec;
   sec = /ss/.test(clockFormat) ? sec : "__";

   return `${hour}:${min}:${sec}${tail}`;
}

function changeTimeOnClock(time) {
   for (let i = 0; i < clock.childNodes.length; i++) {
      clock.childNodes[i].innerText = time[i] || "";
      clock.childNodes[i].style.color =
         `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
   }
}

function randomColor() {
   return Math.round(Math.random() * 1000 % 256);
}
