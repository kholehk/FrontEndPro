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
   });

   function moreAboutMovie(event) { 
      event.preventDefault();
      const route = new URL(event.target.href);
      history.push(`${links.movies}${route.pathname}`);
   }
   
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
               .map(mv => {
                  const card = new Card(mv);
                  const moreLink = card.render().querySelector('[data-id="more"]');
                  moreLink.href = `/${mv.id}`;
                  moreLink.addEventListener("click", moreAboutMovie);
                  return card.render();
               });
               
            break;
         default:
            const err = document.createElement("h1");
            err.innerText = "404";
            
            const id = path.split('/movies/') || [];

            render = id.length = 2? [(new Movie(id[1])).render()] : [err];
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
   history.listen( listener => renderRoute(listener.location.pathname, wrapper) );
   
   const allMovies = document.querySelector(`[href="${links.movies}"]`);
   allMovies.addEventListener("click", event => {

      event.preventDefault();
      history.push(links.movies);

   });

   wrapper.innerHTML = "";
   wrapper.appendChild((new Root).render());
}

main();