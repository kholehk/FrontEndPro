"use strict";

const counters = document.querySelectorAll(".counters_item");

Array.from(counters).forEach((elem) =>
  elem.addEventListener("click", changeCounter)
);

function changeCounter(event) {
  let value = event.target.parentNode.querySelector(".counters_value");

  switch (event.target.dataset.operator) {
    case "+":
      value.innerText++;
      break;
    case "-":
      value.innerText--;
      break;
    default:
  }
}
