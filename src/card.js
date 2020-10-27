"use strict"
const template = require("lodash.template");

export default class Card { 
   constructor({title}) { 
      this._title = title;
   }

   render(container) { 
      const card = require("./card.html");
      // console.log(card);
      const compile = template(card);
      container.innerHTML = compile();
   };
}