"use strict";

const container = document.querySelector(".container");

const label = document.createElement("label");
label.innerText = "Input something: ";
label.classList.add("add_something");

const input = document.createElement("input");

const buttonAdd = document.createElement("button");
buttonAdd.innerText = "Add";

const list = document.createElement("ul");

container.appendChild(label);
container.appendChild(list);
label.appendChild(input);
label.appendChild(buttonAdd);