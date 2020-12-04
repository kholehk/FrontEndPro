"use strict";

import $ from "jquery";
import "bootstrap";
import cardTemplate from "./movie-card.html";
import moreTemplate from "./movie-more.html";
import editTemplate from "./movie-edit.html";
import removeTemplate from "./movie-remove.html";

import { renderTemplate } from "../utils/template-utils";
import { deleteMovie, getMovies, putMovie } from "../utils/api-utils";

const elementForSave = [HTMLInputElement, HTMLTextAreaElement];
export default class Movie {
   constructor(movie, objTemplate) { 
      const { template, cbOnClick } = { ...objTemplate };
      this.id = movie.id;
      this.title = movie.title;
      this._element = renderTemplate(template, { ...movie });

      this._element.querySelectorAll("button").forEach((btn, idx) => {
         cbOnClick[idx] = btn.dataset.click ? btn.dataset.click : cbOnClick[idx];

         btn.addEventListener("click", event => { 
            const cb = Movie[cbOnClick[idx]];

            if (typeof cb !== "function") return;
            cb.bind(this)(event);
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
   };

   async createModal(mv, templ, cbSubmit) {
      const modalMovie = (new Movie(mv, templ)).render;

      this.render.appendChild(modalMovie);

      $(modalMovie).on("shown.bs.modal", () => $(".close").trigger("focus"));

      $(modalMovie).on("hidden.bs.modal", event => event.currentTarget.remove());

      $(modalMovie).find("[type='submit']").on("click", async event => await cbSubmit(event));

      $(modalMovie).modal("show");
   }

   static isElementForSave(elem) {
      return elementForSave.find(html => elem instanceof html);
   }

   static async edit(event) {
      console.log("EDIT MOVIE");

      const templ = {
         template: editTemplate,
         cbOnClick: ["", "addPosition"]
      };

      const movies = await getMovies(this.id);
      movies.forEach(mv => {
         const header = "Редагувати цей фільм";
         this.createModal({...mv, header}, templ, async (event) => {

            const mvEdited = Array.from(event.currentTarget.form)
               .filter(elem => Movie.isElementForSave(elem))
               .reduce((result, elem, idx, arr) => {
                  if (elem.name === "" || elem.value === "") return result;

                  if (elem.name === "others") {
                     result[elem.name][elem.value] = "";
                     arr[idx+1].name = elem.value;

                     return result;
                  };

                  const obj = (elem.name in result.others)? result.others : result;
                  obj[elem.name] = (elem.name === "cast")? elem.value.split(", ") : elem.value;

                  return result;
               }, { others: {}});

            const resultMovie = {...mv, ...mvEdited};

            await putMovie(this.id, resultMovie);
            this.render.replaceWith((new Movie(resultMovie, Movie.card)).render);
         });
      });
   };

   static addPosition(event) {
      const detailed = this.render.querySelector("[data-id='detailed']");

      const newPosition = detailed.lastElementChild.cloneNode(true);

      newPosition
         .querySelector("button")
         .addEventListener("click", event => Movie.delPosition.bind(this)(event));

      detailed.appendChild(newPosition);
   };

   static delPosition(event) {
      event.path
      .find(elem => elem.dataset.id === "others")
      .remove();
   };

   static async remove(event) {
      console.log("DELETE MOVIE");

      const mv = { ...this };
      const templ = {
         template: removeTemplate,
         cbOnClick: []
      };

      this.createModal(mv, templ, async () => {
         await deleteMovie(this.id);
         this.render.style.display = "none";
      });
   };

   static async like(event) { 
      await this.rating(event.currentTarget, "like");
   };

   static async dislike(event) { 
      await this.rating(event.currentTarget, "dislike");
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