"use strict";

const BLUE = "rgb(0, 0, 255)";
const GREEN = "rgb(0, 255, 0)";
const YELLOW = "rgb(255, 255, 0)";
const colors = [BLUE, GREEN, YELLOW];
const colorsRect = document.querySelectorAll(".colors_rect");

if (colorsRect.length) {
  for (let elem of colorsRect) {
    elem.addEventListener("click", changeBgColor);
    // console.log(elem);
  }
}

function changeBgColor(event) {
  const bgColorRect = event.target.style.backgroundColor;

  let indexColor = colors.findIndex((color) => color === bgColorRect);

  indexColor = ++indexColor < colors.length ? indexColor : 0;

  event.target.style.backgroundColor = colors[indexColor];
}
