"use strict";

import movieTemplate from "./movie.html";
import { renderTemplate } from "../utils/template-utils";

export default class Movie { 
   constructor(id) {
      const movie = {
         title: id,
         description: "",
      };
      this._element = renderTemplate(movieTemplate, { ...movie });
   }

   render() { 
      return this._element;
   }
}
