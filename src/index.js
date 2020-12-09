"use strict";

import './style.css';

import $ from "jquery";
import "bootstrap";
import queryString from "query-string";

import Root from './root/root';
import Movie from './movie/movie';

import { getMovies } from './utils/api-utils';
import { getHistory } from './utils/app-history';

function main() {
   
   const links = Object.freeze({
      "root": "/",
      "movies": "/movies",
      "search": "/search"
   });

   async function renderRoute(path, wrapper) {
      let render = [];
      wrapper.innerHTML = "";

      switch (path) {
         case links.root:

            render = [(new Root).render];

            break;
         case links.movies:
            const hash = history.location.hash.slice(1);
            const id = hash !== "search" ? hash : "";
            const templ = id ? Movie.more : Movie.card;
            const movies = await getMovies(id);

            render = movies
               .filter(mv => mv.id !== Movie.blankID)
               .map(mv => (new Movie(mv, templ)).render);
            
            break;
         case links.search:
            render = [];

            break;
         default:
            const err = document.createElement("h1");
            err.innerText = "404";
            render = [err];
      };

      render.forEach( element => wrapper.appendChild(element) );
   };

   const wrapper = document.querySelector("#content");
   if (wrapper === null) return null;

   window.addEventListener("load", event => {
      const route = new URL(event.target.URL);

      renderRoute(route.pathname, wrapper);
   });

   const history = getHistory();
   history.listen(listener => renderRoute(listener.location.pathname, wrapper));
   
   document.addEventListener("click", async event => {
      event.preventDefault();

      const href = event.target.href;
      if (!href) return;

      history.push(href);
   });

   const buttonAddNew = document.querySelector("#add-new");
   if (buttonAddNew) {
      buttonAddNew.addEventListener("click", async event => { 
         const newMovie = new Movie({ id: Movie.blankID }, Movie.blank);
         await newMovie.edit();

         $(".modal").on("hidden.bs.modal", event => history.push(links.movies));
      });
   };
   
   const buttonSearch = document.querySelector(".search");
   if (buttonSearch) { 
      buttonSearch.addEventListener("click", async event => { 
         const search = { title: event.currentTarget.previousElementSibling.value };
         const url = new URL(location);

         url.hash = "search";
         url.search = queryString.stringify(search);
         url.pathname = links.movies;

         history.push(history.createHref(url));
      });
   };

   wrapper.innerHTML = "";
   wrapper.appendChild((new Root).render);
}

main();