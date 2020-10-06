"use strict";

class List {
   constructor(list) {
      this.element = document.createElement("ul");
      list.forEach(item => this.addItem(item));
      this.element.addEventListener("click", event => console.log(event.target.dataset.button));
   }

   addItem(text) {
      const li = document.createElement("li");
      li.innerText = text;

      const buttonDel = document.createElement("button");
      buttonDel.innerText = "Del";
      buttonDel.style.marginLeft = "5px";
      buttonDel.dataset.button = "delItem";

      this.element.appendChild(li);
      li.appendChild(buttonDel);
   }

   delItem(li) { 
      this.element.delete(li);
   }
}

const container = document.querySelector(".container");

const list = new List([]);

const label = document.createElement("label");
label.innerText = "Input something: ";
label.classList.add("add_something");

const input = document.createElement("input");
input.style.marginLeft = "5px";

const buttonAdd = document.createElement("button");
buttonAdd.innerText = "Add";
buttonAdd.addEventListener("click", event =>
   {
      const item = event.target.previousSibling.value;
      console.log(item);
      list.addItem(item);
   }
);

container.appendChild(label);
label.appendChild(input);
label.appendChild(buttonAdd);

container.appendChild(list.element);
