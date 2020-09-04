"use strict";

const RED = "rgb(255, 0, 0)";
const items = ["File", "Edit", "Run", "Help"];
const footer = document.querySelector("footer .container");
const menu = createMenu({ parent: footer, items: items });

for (let item of menu) {
  item.addEventListener("click", clickMenu);
}

function clickMenu(event) {
  const menu = event.target.parentNode.childNodes;

  for (let item of menu) {
    item.style.backgroundColor = "";
  }

  event.target.style.backgroundColor = RED;
}

function createMenu(props) {
  const items = [];
  let itemElement;

  const menu = document.createElement("ul");
  menu.className = "menu";
  props.parent.appendChild(menu);

  for (let itemText of props.items) {
    itemElement = document.createElement("li");
    itemElement.innerText = itemText;
    itemElement.className = "menu_item";

    menu.appendChild(itemElement);
    items.push(itemElement);
  }

  return items;
}
