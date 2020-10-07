"use strict";

class List { 
   constructor(props) { 
      if (!Array.isArray(props)) throw new Error("Constructor is wait props as Array");
      props.forEach(elem => this.addItem(elem));
   }

   addItem(elem) { 
      throw new Error("Method addItem is not implemented");
   }
}

class ListLocalStorage extends List { 
   constructor() {
      super([]);
   }

   addItem(elem) {
      let freeIndex = +localStorage.getItem("freeIndex") || 1;
      localStorage.setItem(freeIndex, elem);
      localStorage.setItem("freeIndex", ++freeIndex);
   }

   getItem(index) { 
      return localStorage.getItem(index);
   }

   delItem(index) { 
      localStorage.removeItem(index);
   }
}
   
const myList = new ListLocalStorage();
myList.addItem("qwerty");
console.log(JSON.stringify(localStorage));

class ListHTML {
   constructor(list) {
      this._element = document.createElement("ul");
      list.forEach(text => this.addItem(text));
      this._element.addEventListener("click", event => {
         const clickEventFunc = event.target.dataset.func;
         if (!clickEventFunc) return;
         console.log(clickEventFunc);
         this[clickEventFunc](event.target.parentElement);
      });
   }

   get element() { 
      return this._element;
   }

   addItem(text) {
      const li = document.createElement("li");
      li.innerText = text || "";

      const buttonDel = document.createElement("button");
      buttonDel.innerText = "Del";
      buttonDel.style.marginLeft = "5px";
      buttonDel.dataset.func = "delItem";

      this.element.appendChild(li);
      li.appendChild(buttonDel);

      localStorage.setItem()
   }

   delItem(li) { 
      console.log(li);
      li.remove();
   }
}

const container = document.querySelector(".container");

const list = new ListHTML([]);

const label = document.createElement("label");
label.innerText = "Input something: ";
label.classList.add("add_something");

const input = document.createElement("input");
input.style.marginLeft = "5px";

const buttonAdd = document.createElement("button");
buttonAdd.innerText = "Add";
buttonAdd.addEventListener("click", event => {
   const text = event.target.previousSibling.value;
   if (!text) return;
   list.addItem(text);
   event.target.previousSibling.value = "";
});

container.appendChild(label);
label.appendChild(input);
label.appendChild(buttonAdd);

container.appendChild(list.element);
