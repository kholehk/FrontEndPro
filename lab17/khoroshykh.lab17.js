"use strict";

class ListHTML{
   constructor(props) {
      if (!props || !props.localStorageKey) return;
      this._localStorageKey = props.localStorageKey;
      this._element = document.createElement("ul");      
      this._element.addEventListener("click", event => {
         const clickEventFunc = event.target.dataset.func;
         if (!clickEventFunc) return;
         this[clickEventFunc](event.target.parentElement);
      });

      this._update = new CustomEvent("update");
      this._element.addEventListener("update", event => 
         localStorage.setItem(
            this._localStorageKey,
            JSON.stringify(
               Array.from(event.target.childNodes).map(elem => elem.querySelector("span").innerText)
            )
         )
      );

      let list = [];

      try { 
         list = JSON.parse(localStorage.getItem(this._localStorageKey));
         if (!Array.isArray(list)) { 
            list = [];
         };
      } catch (err){ 
         console.error(err.name, err.message);
      }

      list.forEach(elem => this.addItem(elem));
   }

   get element() { 
      return this._element;
   }

   addItem(text) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${text}</span>`;
      li.dataset.index = this._element.childNodes.length;

      const buttonDel = document.createElement("button");
      buttonDel.innerText = "Del";
      buttonDel.style.marginLeft = "15px";
      buttonDel.dataset.func = "delItem";

      this.element.appendChild(li);
      li.appendChild(buttonDel);

      this._element.dispatchEvent(this._update);
   }

   delItem(li) {
      li.remove();
      this._element.dispatchEvent(this._update);
   }
}

const container = document.querySelector(".container");
if (container !== null) {

   const list = new ListHTML({ localStorageKey : "list_something"});

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