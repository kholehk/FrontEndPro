"use strict";

class Clock { 
   constructor(props) {
      if (!props || !props.formats) return;
      this._format = props.formats[0];

      const container = document.querySelector(props.container);
      if (!container) return;

      const label = document.createElement("label");
      label.innerText = "Select times format: ";

      const select = document.createElement("select");
      props.formats.forEach(element => {
         let option = document.createElement("option");
         option.text = element;
         select.appendChild(option);
      });
      select.addEventListener("change", event => {
         this._format = event.target.value;
         this.renderClock(this.getTime(new Date()));
      });

      label.appendChild(select);
      container.appendChild(label);

      this._clock = document.createElement("div");
      this._clock.classList.add("clock");
      this.renderClock(this.getTime(new Date()));
      container.appendChild(this._clock);

      const timerID = window.setInterval(() => {
         const time = this.getTime(new Date());
         this.changeTimeOnClock(time);
      }, 1000);
   }

   getTime(date) {
      const ampm = +this._format.split("/")[1] || 24;
      let hour = date.getHours();
      const tail = ampm - 12 ? "" : (hour < 12 ? "AM" : "PM");
      hour = hour >= ampm ? hour - ampm : hour;
      hour = hour < 10 ? "0" + hour : hour;
      hour = /HH/.test(this._format) ? hour : "__";

      let min = date.getMinutes();
      min = min < 10 ? "0" + min : min;
      min = /mm/.test(this._format) ? min : "__";

      let sec = date.getSeconds();
      sec = sec < 10 ? "0" + sec : sec;
      sec = /ss/.test(this._format) ? sec : "__";

      return `${hour}:${min}:${sec}${tail}`;
   }

   changeTimeOnClock(time) {
      for (let i = 0; i < time.length; i++) {
         this._clock.childNodes[i].innerText = time[i] || "";
         this._clock.childNodes[i].style.color =
            `rgb(${Clock.randomColor()}, ${Clock.randomColor()}, ${Clock.randomColor()})`;
      }
   }

   renderClock(time) {
      this._clock.innerHTML = "";
      for (let i = 0; i < time.length; i++) {
         this._clock.appendChild(document.createElement("div"));
      }
   }
   
   static randomColor = function () {
      return Math.round(Math.random() * 1000 % 256);
   };
}

new Clock({
   container: ".container",
   formats: ["HH:mm:ss", "HH:mm:ss/12", "mm:ss", "ss", "HH:ss/12"]
});

new Clock({ container: ".container" });

new Clock();

/*
const LIST_FORMATS = ["HH:mm:ss", "HH:mm:ss/12", "mm:ss", "ss", "HH:ss/12"];

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

select.addEventListener("change", event => {
   clockFormat = event.target.value;
   renderClock(getTime(new Date()));
});


label.appendChild(select);
container.appendChild(label);

const clock = document.createElement("div");
clock.classList.add("clock");

renderClock(getTime(new Date()));

container.appendChild(clock);

const timerID = window.setInterval(() => {
   const time = getTime(new Date());

   // console.clear();
   // console.log(time);
   changeTimeOnClock(time);
}, 1000);

function getTime(date) {
   const ampm = +clockFormat.split("/")[1] || 24;
   let hour = date.getHours();

   const tail = ampm - 12 ? "" : (hour < 12 ? "AM" : "PM");
   hour = hour >= ampm ? hour - ampm : hour;
   hour = hour < 10 ? "0" + hour : hour; 
   hour = /HH/.test(clockFormat) ? hour : "__";

   let min = date.getMinutes();
   min = min < 10 ? "0" + min : min;
   min = /mm/.test(clockFormat) ? min : "__";

   let sec = date.getSeconds();

   sec = sec < 10 ? "0" + sec : sec;
   sec = /ss/.test(clockFormat) ? sec : "__";

   return `${hour}:${min}:${sec}${tail}`;
}

function changeTimeOnClock(time) {

   for (let i = 0; i < time.length; i++) {

      clock.childNodes[i].innerText = time[i] || "";
      clock.childNodes[i].style.color =
         `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
   }
}

function renderClock(time) {
   clock.innerHTML = "";
   for (let i = 0; i < time.length; i++) { 
      clock.appendChild(document.createElement("div"));
   }
}
 
function randomColor() {
   return Math.round(Math.random() * 1000 % 256);
}
*/
