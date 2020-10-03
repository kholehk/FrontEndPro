"use strict";

const LIST_FORMATS = ["hh:mm:ss/24", "hh:mm:ss/12", "h:m:s/24", "h:m:s/12"];

class Clock {
   constructor() {
      this.format = LIST_FORMATS[0];
   }
}
const myClock = new Clock();
const container = document.querySelector(".container");

const label = document.createElement("label");
label.innerText = "Select times format: ";

const select = document.createElement("select");
LIST_FORMATS.forEach(element => {
   let option = document.createElement("option");
   option.text = element;
   select.appendChild(option);
});
select.addEventListener("change", event => renderClock(event.target.value));

label.appendChild(select);
container.appendChild(label);

const clock = document.createElement("div");
clock.classList.add("clock");
container.appendChild(clock);
renderClock(myClock.format);

const timerID = window.setInterval(() => {
   const time = getTime(new Date(), myClock.format);

   // console.clear();
   // console.log(time);
   changeTimeOnClock(time);
}, 1000);

function getTime(date, format) {
   const hour =
      date.getHours() < 10 ? "0" + date.getHours() : date.getHours();

   const min =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

   const sec =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

   return format.replace(/HH(\D)mm(\D)ss/, `${hour}$1${min}$2${sec}`);
}

function renderClock(format) {
   myClock.format = format;
   clock.innerHTML = "";
   for (let char of format) {
      clock.appendChild(document.createElement("div"));
   }
}

function changeTimeOnClock(time) {
   for (let i = 0; i < clock.childNodes.length; i++) {
      clock.childNodes[i].innerText = time[i];
      clock.childNodes[i].style.color =
         `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
   }
}

function randomColor() {
   return Math.round(Math.random() * 1000 % 256);
}
