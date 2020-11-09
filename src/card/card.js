"use strict";

import cardTemplate from "./card.html";
import { renderTemplate } from "./../template-utils";

export default class Card { 
   constructor(movie) {
      this._movie = movie;

      this._element = renderTemplate(cardTemplate, { ...movie });
      
      this._element.querySelector("[data-id=poster]").src = movie.poster || "";

      const eventFunction = ["editCard", "deleteCard"];

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         btn.addEventListener("click", event => this[eventFunction[idx]]());
      });
   }

   render() {
   
      return this._element;
   };

   editCard() {
      console.log("EDIT CARD", this._movie.title);
   };

   deleteCard() { 
      console.log("CLOSE CARD", this._movie.title);
      this._element.style.display = "none";
   };
}