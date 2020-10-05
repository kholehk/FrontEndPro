"use strict";

const LIST_FORMATS = ["hh:mm:ss/24", "hh:mm:ss/12", "h:m:s/24", "h:m:s/12", "mm:s", "ss", "hh:mm/12"];
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
   const ampm = clockFormat.split("/")[1] === "12" ? 12 : 0;
   let hour = date.getHours();
   hour = hour > 12 ? hour - ampm : hour;
   hour = testFormat(/h/, hour);
      // /h/.test(format)
      // ? (hour < 10
      //    ? (/hh/.test(format) ? "0" + hour : "_" + hour)
      //    : hour)
      // : "__";

   let min = date.getMinutes();
   min = /m/.test(clockFormat)
      ? (min < 10 && /mm/.test(clockFormat) ? "0" + min : min)
      : "__";

   let sec = date.getSeconds();
   sec = /s/.test(clockFormat)
      ? (sec < 10 && /ss/.test(clockFormat) ? "0" + sec : sec)
      : "__";

   return `${hour}:${min}:${sec}${ampm ? (hour < "12" ? "AM" : "PM") : ""}`;
}

function testFormat(hmsExp, element) {
   return hmsExp.test(clockFormat)
      ? (element < 10
         ? ((hmsExp + hmsExp).test(clockFormat) ? "0" + element: "_" + element)
         : element)
      : "__";;
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
