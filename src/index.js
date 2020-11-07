"use strict";

//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { getMovies } from './movies-utils';
import Card from './card/card';

async function main() {

   const wrapper = document.querySelector("#content");
   if (wrapper === null) return null;

   const movies = await getMovies('http://localhost:3000/movies/');

   wrapper.innerHTML = "";
   const cards = movies
      .filter(mv => mv.id)
      .map(mv => new Card(mv));

   cards.forEach(card => wrapper.appendChild(card.render()));
}

main();