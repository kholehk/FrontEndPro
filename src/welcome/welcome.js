"use strict";

import welcomeTemplate from "./welcome.html";
import { renderTemplate } from "../template-utils";

export default class Welcome { 
   constructor() {

      this._element = renderTemplate(welcomeTemplate);
      
   }

   render() {
   
      return this._element;
   };

}