"use strict";

import './style.css';
import { getMovies } from './movies-utils';
import Card from './card/card';
import { getHistory } from "./app-history";

async function renderRoute(path, wrapper) {
   switch (path) {
      case "/":
         wrapper.innerText = "HELLO";
         break;
      case "/movies":

         const movies = await getMovies('http://localhost:3000/movies/');

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

   const history = getHistory();
   const allMovies = document.querySelector("[href=\"#movies\"]");
   allMovies.addEventListener("click", event => { 

      event.preventDefault();
      history.push("/movies");

   });   

   history.listen(listener => {
      console.log("LISTEN", listener);
      renderRoute(listener.location.pathname, wrapper);
   });
}

main();