"use strict";

const mainWrapper = document.querySelector('main .wrapper');
if (mainWrapper !== null) { 
   const listCounters = createList();
   const countersArray = [];
   const countersAmount = 5;
   let button;
   
   for (let i = 0; i < countersAmount; i++) { 
      countersArray.push(createListItem({ text: '0', className: 'counters_item' }));
   }

   listCounters.className = 'counters';
   mainWrapper.appendChild(listCounters);

   countersArray.forEach(elem => {

      listCounters.appendChild(elem);

      button = createButton({ text: '+' });
      button.addEventListener("click", incCounter);
      elem.appendChild(button);

      button = createButton({ text: '-' });
      button.addEventListener("click", decCounter);
      elem.appendChild(button);
   });
}

function incCounter(event) { 

   return event.target.parentElement.firstChild.innerHTML++;
}

function decCounter(event) {

   return event.target.parentElement.firstChild.innerHTML--;
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

   element.className = props.className || "";
   element.innerHTML = `<span class="counters_value">${text}</span>`;

   return element;
}

function createList(props) {

   return document.createElement("ul");
}