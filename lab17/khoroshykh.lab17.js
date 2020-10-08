"use strict";

class ListHTML{
   constructor() {
      this._element = document.createElement("ul");      
      this._element.addEventListener("click", event => {
         const clickEventFunc = event.target.dataset.func;
         if (!clickEventFunc) return;
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
      li.innerHTML = `<span>${text}</span>`;
      li.dataset.index = this._freeIndex;
      localStorage.setItem(this._freeIndex, text);
      this._freeIndex++;

      const buttonDel = document.createElement("button");
      buttonDel.innerText = "Del";
      buttonDel.style.marginLeft = "15px";
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
if (container !== null) {

   const list = new ListHTML([]);

   const label = document.createElement("label");
   label.innerText = "Input something: ";

   const input = document.createElement("input");
   input.type = "text";

   const buttonAdd = document.createElement("button");
   buttonAdd.innerText = "Add";
   buttonAdd.type = "submit";

   const form = document.createElement("form");
   form.classList.add("add_something");
   form.addEventListener("submit", event => {
      event.preventDefault();
      const text = input.value;
      if (!text) return;
      list.addItem(text);
      input.value = "";
   });

   container.appendChild(form);
   form.appendChild(label);
   form.appendChild(buttonAdd);
   label.appendChild(input);

   container.appendChild(list.element);
}