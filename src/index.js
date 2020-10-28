"use strict";

import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import Card from './card/card';

class Film {
   constructor() { 
      [this._title, this._description, this._poster] = [...arguments];
   }

   get title() { return this._title };
   set title(text) { this._title = text};
};

const films = [
   new Film("Віддана", "Фільм про відданість"),
];

const card = new Card("./card.html", films[0]);

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);
wrapper.appendChild(card.render());
