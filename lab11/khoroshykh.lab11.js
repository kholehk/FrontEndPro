"use strict";

const itemButtons = [
   {
      text: "Edit",
      func: editUser
   },
   {
      text: "Del",
      func: delUser
   }
];

const container = document.querySelector("main .container");

if (container) { 

   const formAddName = document.createElement("form");
   formAddName.name = "addname";
   container.appendChild(formAddName);
   formAddName.addEventListener("submit", addName);

   const labelName = document.createElement("label");
   labelName.innerHTML = "<em>Name:</em>";
   formAddName.appendChild(labelName);

   const inputName = document.createElement("input");
   inputName.placeholder = "Input Name";
   inputName.name = "username";
   inputName.style.margin = "10px";
   labelName.appendChild(inputName);

   const buttonAddName = document.createElement("button");
   buttonAddName.innerText = "Add";
   buttonAddName.type = "submit";
   formAddName.appendChild(buttonAddName);

   const listUsers = document.createElement("ol");
   listUsers.dataset.list = "users";
   listUsers.style.margin = "10px";
   container.appendChild(listUsers);
}

function addName(event) { 
   event.preventDefault();

   const inputName = Array
      .from(event.target)
      .find(elem => isInputName(elem));
   
   if (!inputName.value) return;

   const listUsersItem = document.createElement("li");
   listUsersItem.innerText = inputName.value;

   const listUsers = Array
      .from(document.querySelectorAll("ol"))
      .find(elem => elem.dataset.list === "users");
   listUsers.appendChild(listUsersItem);
   listUsers.addEventListener("click", changeItem);

   itemButtons.forEach(elem =>
      createButtonForItem({ text: elem.text, func: elem.func.name, item: listUsersItem })
   );
}

function isInputName(elem) {
   return elem instanceof HTMLInputElement && elem.name === "username";
}

function createButtonForItem(props) {
   const button = document.createElement("button");
   button.innerText = props.text;
   button.dataset.func = props.func;
   button.style.margin = "10px";
   props.item.appendChild(button);
}

function changeItem(event) {
   const ourItem = event.target.parentNode;

   window[event.target.dataset.func]();
}

function editUser() {
   prompt("Edit name:");
}

function delUser() {
   confirm("is User delete?");
}