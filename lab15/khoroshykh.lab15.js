"use strict";

const formatTime = "HH:mm:ss";
const container = document.querySelector(".container");

renderClock(formatTime);

const timerID = window.setInterval(() => {
  const time = getTime(new Date(), formatTime);

  console.clear();
  console.log(time);
  putTimeOnClock(time);
}, 1000);

function getTime(date, format) {
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const min =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const sec =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  return format.replace(/HH(\D)mm(\D)ss/, `${hour}$1${min}$2${sec}`);
}

function renderClock(format) {
  const clock = document.createElement("div");
  clock.classList.add("clock");
  container.appendChild(clock);

  for (let char of format) {
    let elementOfClock = document.createElement("div");
    elementOfClock.innerText = char;
    clock.appendChild(elementOfClock);
  }
}

function putTimeOnClock(time) {}
