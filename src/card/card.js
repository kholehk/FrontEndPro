"use strict";

import { renderTemplate } from "./../template-utils";

const template = require("./card.html");

export default class Card { 
   constructor(film) {
      this._film = film;

      this._element = renderTemplate(template, { ...film });
      
      this._element.querySelector("[data-id=poster]").src = film.poster || "";

      const eventFunction = ["editCard", "deleteCard"];

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         btn.addEventListener("click", event => this[eventFunction[idx]]());
      });
   }

   render() {
   
      return this._element;
   };

   editCard() {
      console.log("EDIT CARD", this._film.title);
   };

   deleteCard() { 
      console.log("CLOSE CARD", this._film.title);
      this._element.style.display = "none";
   };
}