"use strict";

import cardTemplate from "./movie-card.html";
import moreTemplate from "./movie-more.html";
import editTemplate from "./movie-edit.html";
import removeTemplate from "./movie-remove.html";

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
            const cb = Movie[cbOnClick[idx]];

            if (typeof cb !== "function") return;
            cb.bind(this)(event.currentTarget);
         })
      });
   }

   static get card() {
      return {
         template: cardTemplate,
         cbOnClick: ["edit", "remove"]
      };
   };

   static get more() {
      return {
         template: moreTemplate,
         cbOnClick: ["like", "dislike"]
      };
   };

   get render() { 
      return this._element;
   }

   async modal(mv, templ, cbSubmit) {
      const modalMovie = new Movie(mv, templ).render;

      this.render.appendChild(modalMovie);
      modalMovie.querySelector(`[type="submit"]`)
         .addEventListener("click", async () => cbSubmit());

      $(modalMovie).on('shown.bs.modal', () => $(".close").trigger('focus'));

      $(modalMovie).on("hidden.bs.modal", event => event.currentTarget.remove());

      $(modalMovie).modal("show");
   }

   static async edit(target) {
      console.log("EDIT MOVIE");

      const templ = {
         template: editTemplate,
         cbOnClick: []
      };

      const movies = await getMovies(this.id);
      movies.forEach(mv => {
         mv.header = "Редагувати цей фільм";
         this.modal(mv, templ);
      });
   };

   static async remove(target) {
      console.log("DELETE MOVIE");

      const mv = { ...this };
      const templ = {
         template: removeTemplate,
         cbOnClick: []
      };

      this.modal(mv, templ, async () => {
         await deleteMovie(this.id);
         this.render.style.display = "none";
      });
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