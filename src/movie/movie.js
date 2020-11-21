"use strict";

import cardTemplate from "./movie-card.html";
import moreTemplate from "./movie-more.html";
import { renderTemplate } from "../utils/template-utils";
import { deleteMovie } from "../utils/api-utils";

class Movie { 
   constructor(movie, template) { 
      this._movie = movie;
      this._element = renderTemplate(template, { ...movie });
   }

   render() { 
      return this._element;
   }
}

export class CardMovie extends Movie {
   constructor(movie) {
      super(movie, cardTemplate);

      const eventFunction = ["editCard", "deleteCard"];

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         btn.addEventListener("click", event => this[eventFunction[idx]]());
      });

      this._element.querySelector(`[data-id="more"]`).href = `/movies#${movie.id}`;
   }

   editCard() {
      console.log("EDIT MOVIE", this._movie.title);
   };

   async deleteCard() {

      if (confirm(`Ви дійсно бажаєте видалити фільм: "${this._movie.title}"?`)) {

         console.log("DELETE MOVIE", this._movie.title);
         this._element.remove();

         const path = `${location.pathname}/${this._movie.id}`;
         await deleteMovie(path);
      }
   };
}

export class MoreMovie extends Movie { 
   constructor(movie) {
      super(movie, moreTemplate);
   };
}