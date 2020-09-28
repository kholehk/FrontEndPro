"use strict";

const container = document.querySelector(".container");



const timerID = window.setInterval(
   () => {
      console.clear();
      console.log(formatTime(new Date()));
   },
   1000
);

function formatTime(date, format) {
   const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
   const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
   const sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

   return `${hour}:${min}:${sec}`;
}