"use strict";

const mainWrapper = document.querySelector('main .wrapper');
if (mainWrapper !== null) { 
   const listCounters = createList();
   const countersArray = [];
   const countersAmount = 5;
   
   for (let i = 0; i < countersAmount; i++) { 
      countersArray.push(createListItem({ text: '0' }));
   }

   listCounters.className = 'counters_list';
   mainWrapper.appendChild(listCounters);

   countersArray.forEach(elem => {
      elem.className = 'counters_list_item';
      listCounters.appendChild(elem);
      elem.appendChild(createButton({ text: '+' }));
      elem.appendChild(createButton({ text: '-' }));
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
   element.innerHTML = `<span>${text}</span>`;

   return element;
}

function createList(props) {

   return document.createElement("ul");
}