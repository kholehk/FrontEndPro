"use strict";

import movieTemplate from "./movie.html";
import { renderTemplate } from "../utils/template-utils";

export default class Movie { 
   constructor(movie) {
      this._movie = movie;
      this._element = renderTemplate(movieTemplate, { ...movie });
   }

   render() { 
      return this._element;
   }
}
