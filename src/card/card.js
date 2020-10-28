"use strict";

import { renderTemplate } from "./../template-utils";

const tmpl = require("./card.html");

export default class Card { 
   constructor() {
      [this._template, this._content] = [...arguments];
   }

   render() {
      return renderTemplate(tmpl, this._content);
   };
}