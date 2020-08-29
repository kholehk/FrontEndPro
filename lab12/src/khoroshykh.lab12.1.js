"use strict";

const mainWrapper = document.querySelector('main .wrapper');
if (mainWrapper !== null) { 
   const listCounters = createList();
   const countersArray = [];
   const countersAmount = 5;
   let button;
   
   for (let i = 0; i < countersAmount; i++) { 
      countersArray.push(createListItem({ text: '0', classList: ['counters_item'] }));
   }

   listCounters.className = 'counters';
   mainWrapper.appendChild(listCounters);

   countersArray.forEach(elem => {

      listCounters.appendChild(elem);

      button = createButton({ text: '+' });
      button.addEventListener("click", event =>
         event.target.parentElement.firstChild.innerHTML++);
      elem.appendChild(button);

      button = createButton({ text: '-' });
      button.addEventListener("click", event =>
         event.target.parentElement.firstChild.innerHTML--);
      elem.appendChild(button);
   });
}

function createButton(props) { 
   const text = props.text || "";

   const element = document.createElement("button");
   element.innerHTML = text;

   return element;
}

function createListItem(props) {
   const text = props.text || "";
   const element = document.createElement("li");

   element.classList = props.classList || [];
   element.innerHTML = `<span class="counters_value">${text}</span>`;

   return element;
}

function createList(props) {

   return document.createElement("ul");
}