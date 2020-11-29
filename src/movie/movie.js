"use strict";

import cardTemplate from "./movie-card.html";
import moreTemplate from "./movie-more.html";
import removesTemplate from "./movie-removes.html";

import { renderTemplate } from "../utils/template-utils";
import { deleteMovie, getMovies, putMovie } from "../utils/api-utils";

export default class Movie {
   constructor(movie, objTemplate) { 
      const { template, cbOnClick } = { ...objTemplate };
      this.id = movie.id;
      this.title = movie.title;
      this._element = renderTemplate(template, { ...movie });

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         btn.addEventListener("click", event => { 
            const cb = Movie[cbOnClick[idx]].bind(this);

            if (typeof cb !== "function") return;
            cb(event.currentTarget);
         })
      });
   }

   static get card() {
      return {
         template: cardTemplate,
         cbOnClick: ["editRequest", "removeRequest"]
      };
   };

   static get more() {
      return {
         template: moreTemplate,
         cbOnClick: ["like", "dislike"]
      };
   };

   static get removes() { 
      return {
         template: removesTemplate,
         cbOnClick: ["cancel", "cancel", "removeConfirm"]
      };
   };

   get render() { 
      return this._element;
   }

   static async editRequest(target) {
      console.log("EDIT MOVIE", this.title, target);
   };

   static async removeRequest(target) {
      console.log("DELETE MOVIE", this.title, target);

      const mv = { ...this };
      const templ = Movie.removes;
      this.render.appendChild((new Movie(mv, templ)).render);

      $(".removes").on('shown.bs.modal', () => $(".close").trigger('focus'));
      $(".btn-primary").on("click", () => this.render.style.display = "none");
      $(".removes").on("hidden.bs.modal", event => event.currentTarget.remove());
   };

   static async removeConfirm(target) {
      await deleteMovie(this.id);
   };

   static async cancel(target) { 
      // this.render.remove();
   };

   static async like(target) { 
      await this.rating(target, "like");
   };

   static async dislike(target) { 
      await this.rating(target, "dislike");
   };

   async rating(target, vote) {
      let votedMovies = [];
      try { 
         votedMovies = JSON.parse(localStorage.getItem("voted"));
      } catch { 
         votedMovies = [];
      };
      votedMovies = Array.isArray(votedMovies) ? votedMovies : [];
      if (votedMovies.includes(this.id)) return;

      const movies = await getMovies(this.id);
      movies.forEach(async mv => {
         target.dataset.count = ++mv[vote];
         await putMovie(this.id, mv);
      });

      votedMovies.push(this.id);
      localStorage.setItem("voted", JSON.stringify(votedMovies));
   }
}