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
         btn.addEventListener("click", async event => this[cbEventList[idx]](event.currentTarget));
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

   edit(target) {
      console.log("EDIT MOVIE", this._title, target);
   };

   async remove(target) {

      if (confirm(`Ви дійсно бажаєте видалити фільм: "${this._title}"?`)) {

         console.log("DELETE MOVIE", this._title, target);
         this._element.remove();

         await deleteMovie(this._id);
      }
   };

   async like(target) { 
      await this.rating(target, "like");
   };

   async dislike(target) { 
      await this.rating(target, "dislike");
   };

   async rating(target, vote) {
      let votedMovies = [];
      try { 
         votedMovies = await JSON.parse(localStorage.getItem("voted"));
      } catch { 
         votedMovies = [];
      };
      votedMovies = Array.isArray(votedMovies) ? votedMovies : [];
      if (votedMovies.includes(this._id)) return;

      const movies = await getMovies(this._id);
      movies.forEach(async mv => {
         target.dataset.count = ++mv[vote];
         await putMovie(this._id, mv);
      });

      votedMovies.push(this._id);
      localStorage.setItem("voted", JSON.stringify(votedMovies));
   }
}