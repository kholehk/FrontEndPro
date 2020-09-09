"use strict";

const DATANAME = "name";
const userButtons = [
   {
      text: "Редагувати",
      func: editUser,
   },
   {
      text: "Видалити",
      func: delUser,
   }
];

const container = document.querySelector("main .container");
const listUsers = document.querySelector("ol.users");

if (container && listUsers) {

   for (let userItem of listUsers.children) { 
      initUserItem({ text: userItem.innerText, item: userItem });
   }
   listUsers.addEventListener("click", changeUser);

   const formAddUser = document.createElement("form");
   formAddUser.name = "addUser";
   container.prepend(formAddUser);
   formAddUser.addEventListener("submit", addUser);

   const labelAddUser = document.createElement("label");
   labelAddUser.innerHTML = "<em>Користувач:</em>";
   formAddUser.appendChild(labelAddUser);

   const inputAddUser = document.createElement("input");
   inputAddUser.type = "text";
   inputAddUser.placeholder = "Ім'я";
   inputAddUser.dataset.info = DATANAME;
   inputAddUser.style.margin = "10px";
   labelAddUser.appendChild(inputAddUser);

   const buttonAddUser = document.createElement("button");
   buttonAddUser.innerText = "Додати";
   buttonAddUser.type = "submit";
   formAddUser.appendChild(buttonAddUser);
}

function addUser(event) { //submit
   event.preventDefault();

   const inputName = Array
      .from(event.target)
      .find(elem => isInputName(elem));
   
   if (!inputName.value) return;

   const userItem = document.createElement("li");
   listUsers.appendChild(userItem);
   initUserItem({ text: inputName.value, item: userItem });
   inputName.value = "";
};

function initUserItem(props) { 
   props.item.innerText = "";

   const userName = document.createElement("p");
   userName.innerText = props.text;
   userName.dataset.info = DATANAME;
   props.item.appendChild(userName);

   userButtons.forEach(elem =>
      createUserButton({ text: elem.text, func: elem.func.name, item: props.item })
   );
};

function isInputName(elem) {
   return elem instanceof HTMLInputElement && elem.dataset.info === DATANAME;
}

function createUserButton(props) {
   const button = document.createElement("button");
   button.style.marginLeft = "5px";
   button.innerText = props.text;
   button.type = "button";
   button.dataset.func = props.func;
   props.item.appendChild(button);
}

function changeUser(event) {
   const userItem = event.target.parentNode;
   const func = event.target.dataset.func;
   if (!func) return;
   window[func](userItem);
}

function editUser(user) {
   const userName = Array
      .from(user.children)
      .find(elem => elem.dataset.info === DATANAME);

   userName.innerText = prompt(
      "Редагувати ім'я користувача:", userName.innerText
   ) || userName.innerText;
}

function delUser(user) {
   if (confirm("Видалити користувача?")) user.remove();
}