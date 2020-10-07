"use strict";

class ListHTML{
   constructor() {
      this._element = document.createElement("ul");      
      this._element.addEventListener("click", event => {
         const clickEventFunc = event.target.dataset.func;
         if (!clickEventFunc) return;
         console.log(clickEventFunc);
         this[clickEventFunc](event.target.parentElement);
      });

      const list = [];
      let keys = Object.keys(localStorage);
      for (let key of keys) {
         if (Number.isNaN(key)) continue;
         list[key] = localStorage.getItem(key);
      }

      localStorage.clear();
      this._freeIndex = 0;

      list.forEach(elem => {
         if (elem !== null)
         {
            this.addItem(elem);
         }
      });
   }

   get element() { 
      return this._element;
   }

   addItem(text) {
      const li = document.createElement("li");
      li.innerText = text || "";
      li.dataset.index = this._freeIndex;
      localStorage.setItem(this._freeIndex, text);
      this._freeIndex++;

      const buttonDel = document.createElement("button");
      buttonDel.innerText = "Del";
      buttonDel.style.marginLeft = "5px";
      buttonDel.dataset.func = "delItem";

      this.element.appendChild(li);
      li.appendChild(buttonDel);
   }

   delItem(li) { 
      localStorage.removeItem(li.dataset.index);
      li.remove();
   }
}

const container = document.querySelector(".container");

const list = new ListHTML([]);

const label = document.createElement("label");
label.innerText = "Input something: ";

const input = document.createElement("input");

const buttonAdd = document.createElement("button");
buttonAdd.innerText = "Add";
buttonAdd.type = "submit";

const form = document.createElement("form");
form.classList.add("add_something");
form.addEventListener("submit", event => {
   event.preventDefault();
   const text = event.target;
   if (!text) return;
   list.addItem(text);
   event.target = "";
});

container.appendChild(form);
form.appendChild(label);
label.appendChild(input);
form.appendChild(buttonAdd);

container.appendChild(list.element);
