"use strict";

import cardTemplate from "./card.html";
import { renderTemplate } from "../utils/template-utils";
import { deleteMovie } from "../utils/api-utils";

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
      console.log("EDIT MOVIE", this._movie.title);
   };

   async deleteCard() { 

      if (confirm(`Ви дійсно бажаєте видалити фільм: "${this._movie.title}"?`)) { 

         console.log("DELETE MOVIE", this._movie.title);
         // this._element.style.display = "none";
         // this._element.innerText = "";
         this._element.remove();

         const path = `${location.pathname}/${this._movie.id}`;
         await deleteMovie(path);
      }
   };
}