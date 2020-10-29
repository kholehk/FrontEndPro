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
   }

   render() {
   
      return this._element;
   };
}