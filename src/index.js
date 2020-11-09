"use strict";

import './style.css';

import Welcome from './welcome/welcome';
import Card from './card/card';

import { getMovies } from './movies-utils';
import { getHistory } from './app-history';

const urlAPI = new URL("http://localhost:3000");

async function renderRoute(path, wrapper) {
   const urlPath = new URL(path, urlAPI);

   switch (path) {
      case "/":
         wrapper.innerHTML = "";
         wrapper.appendChild((new Welcome).render());
         break;
      case "/movies":
         const movies = await getMovies(urlPath);

         wrapper.innerHTML = "";
         const cards = movies
            .filter(mv => mv.id)
            .map(mv => new Card(mv));

         cards.forEach(card => wrapper.appendChild(card.render()));
         
         break;
      default:
         wrapper.innerText = "404";
         break;
   }
}

async function main() {

   const wrapper = document.querySelector("#content");
   if (wrapper === null) return null;

   wrapper.appendChild((new Welcome).render());

   const history = getHistory();
   history.listen(listener => {
      // console.log("LISTEN", listener);
      renderRoute(listener.location.pathname, wrapper);
   });

   const allMovies = document.querySelector("[href=\"#movies\"]");
   allMovies.addEventListener("click", event => {

      event.preventDefault();
      history.push("/movies");

   });
}

main();