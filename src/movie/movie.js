"use strict";

import cardTemplate from "./movie-card.html";
import moreTemplate from "./movie-more.html";
import { renderTemplate } from "../utils/template-utils";
import { deleteMovie, getMovies, putMovie } from "../utils/api-utils";

export default class Movie {
   constructor(movie, objTemplate) { 
      const { template, cbEventList } = { ...objTemplate };
      // this._movie = movie;
      this._id = movie.id;
      this._title = movie.title;
      this._element = renderTemplate(template, { ...movie });

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         btn.addEventListener("click", event => this[cbEventList[idx]]());
      });
   }

   static get card() {
      return {
         template: cardTemplate,
         cbEventList: ["edit", "remove"]
      };
   };

   static get more() {
      return {
         template: moreTemplate,
         cbEventList: ["like", "dislike"]
      };
   };

   render() { 
      return this._element;
   }

   edit() {
      console.log("EDIT MOVIE", this._title);
   };

   async remove() {

      if (confirm(`Ви дійсно бажаєте видалити фільм: "${this._title}"?`)) {

         console.log("DELETE MOVIE", this._title);
         this._element.remove();

         await deleteMovie(this._id);
      }
   };

   async like() { 
      console.log("LIKE");
      const movies = await getMovies(this._id);
      movies.forEach(async mv => { mv.like++; await putMovie(this._id, mv)});
   };

   dislike() { 
      console.log("DISLIKE");
   };
}