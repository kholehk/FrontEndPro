"use strict";

//import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import { films } from './films';
import Card from './card/card';

const wrapper = document.querySelector("#content");
wrapper.innerHTML = "";

const cards = films
   .filter(film => film.id)
   .map(film => new Card(film));

cards.forEach(card => wrapper.appendChild(card.render()));
