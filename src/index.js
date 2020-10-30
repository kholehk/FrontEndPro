"use strict";

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { films } from './films';
import Card from './card/card';

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);

const cards = [
   new Card(films[1]),
   new Card(films[2]),
];

cards.forEach(card => wrapper.appendChild(card.render()));
