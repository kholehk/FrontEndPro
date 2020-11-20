"use strict";

import './style.css';

import Root from './root/root';
import Card from './card/card';
import Movie from './movie/movie';

import { getMovies } from './utils/api-utils';
import { getHistory } from './utils/app-history';

function main() {
   
   const links = Object.freeze({
      "root": "/",
      "movies": "/movies",
      "movie": "/movie",
   });

   async function renderRoute(path, wrapper) {
      let render = [];
      wrapper.innerHTML = "";

      switch (path) {
         case links.root:

            render = [(new Root).render()];

            break;
         case links.movies:

            const movies = await getMovies(path);

            render = movies
               .filter(mv => mv.id)
               .map(mv => (new Card(mv)).render());
               
            break;
         case links.movie:
            if (history.location.hash) {
               render = [(new Movie(history.location.hash)).render()];
            }
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
   wrapper.appendChild((new Root).render());
}

main();