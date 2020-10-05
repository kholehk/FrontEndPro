"use strict";

const formatTime = "HH:mm:ss";
const container = document.querySelector(".container");

const clock = document.createElement("div");
clock.classList.add("clock");
container.appendChild(clock);
renderClock(formatTime);

const timerID = window.setInterval(() => {
   const time = getTime(new Date(), formatTime);

   console.clear();
   console.log(time);
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
