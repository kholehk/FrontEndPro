"use strict";

import './style.css';

import Root from './root/root';
import Movie from './movie/movie';

import { getMovies } from './utils/api-utils';
import { getHistory } from './utils/app-history';

function main() {
   
   const links = Object.freeze({
      "root": "/",
      "movies": "/movies",
   });

   async function renderRoute(path, wrapper) {
      let render = [];
      wrapper.innerHTML = "";

      switch (path) {
         case links.root:

            render = [(new Root).render];

            break;
         case links.movies:
            const id = history.location.hash.slice(1);
            const templ = id ? Movie.more : Movie.card;
            const movies = await getMovies(id);

            render = movies
               .filter(mv => mv.id)
               .map(mv => (new Movie(mv, templ)).render);
            
            break;
         default:
            const err = document.createElement("h1");
            err.innerText = "404";
            render = [err];
      }

      render.forEach( element => wrapper.appendChild(element) );
   }

   const wrapper = document.querySelector("#content");
   if (wrapper === null) return null;

   window.addEventListener("load", event => {

      const route = new URL(event.target.URL);
      renderRoute(route.pathname, wrapper);

   });

   const history = getHistory();
   history.listen(listener => {
      renderRoute(listener.location.pathname, wrapper);
   });
   
   document.addEventListener("click", event => {
      event.preventDefault();

      if (!event.target.href) return;
      history.push(event.target.href);

   });

   wrapper.innerHTML = "";
   wrapper.appendChild((new Root).render);
}

main();