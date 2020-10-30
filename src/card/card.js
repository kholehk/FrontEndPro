"use strict";

import { renderTemplate } from "./../template-utils";

const template = require("./card.html");

export default class Card { 
   constructor(film) {
      const { title = "", description = "", poster = ""} = film;

      const data = {
         title,
         description,
         imdb: "IMDB",
         edit: "editCard",
         close: "closeCard",
      };

      this._element = renderTemplate(template, data);
      
      if (poster !== "") {
         this._element.querySelector("[data-id=poster]").src = poster;
      }

      this._element
         .addEventListener("click", (event) => {

            console.clear();
            event.path.forEach(element => {
               if (element === event.currentTarget) return;
               if (element.dataset.func) { this[element.dataset.func](); };
            });
         });
      
   }

   render() {
   
      return this._element;
   };

   closeCard() { 
      console.log("CLOSE CARD");
   }

   editCard() { 
      console.log("EDIT CARD");
   };
}