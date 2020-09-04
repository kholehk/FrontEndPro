"use strict";

const RED = "rgb(255, 0, 0)";

const menu = document.querySelectorAll(".menu_item");

for (let item of menu) {
  item.addEventListener("click", clickMenu);
}

// console.log(menu);

function clickMenu(event) {
  for (let item of menu) {
    item.style.backgroundColor = "";
  }

  event.target.style.backgroundColor = RED;
}
