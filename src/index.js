"use strict";

import './style.css';

import Welcome from './welcome/welcome';
import Card from './card/card';

import { getMovies } from './utils/api-utils';
import { getHistory } from './utils/app-history';

function main() {
   
   const links = Object.freeze({
      "home": "/",
      "movies": "/movies",
   });
   
   async function renderRoute(path, wrapper) {

      wrapper.innerHTML = "";

      switch (path) {
         case links.home:
            wrapper.appendChild((new Welcome).render());
            break;

         case links.movies:
            const movies = await getMovies(path);

            const cards = movies
               .filter(mv => mv.id)
               .map(mv => new Card(mv));

            cards.forEach(card => wrapper.appendChild(card.render()));
            break;

         default:
            wrapper.innerHTML = "<h1>404</h1>";
            break;
      }
   }

   const wrapper = document.querySelector("#content");
   if (wrapper === null) return null;

   const history = getHistory();
   history.listen(listener => {

      renderRoute(listener.location.pathname, wrapper);
   });
   
   const allMovies = document.querySelector(`[href="${links.movies}"]`);
   allMovies.addEventListener("click", event => {

      event.preventDefault();
      history.push(links.movies);

   });

   window.addEventListener("load", event => { 

      const route = new URL(event.target.URL);
      renderRoute(route.pathname, wrapper);

   });

   renderRoute(links.home, wrapper);
}

main();