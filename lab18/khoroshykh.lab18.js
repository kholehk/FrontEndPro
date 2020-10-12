"use strict";

class RequestList { 
   constructor(props) { 
      if (!props || !props.url) return;
      this.url = new URL(props.url);
      console.log(this.characters);
   }

   get characters() { 
      this.xhr = new XMLHttpRequest();
      this.xhr.open("GET", this.url);
      this.xhr.responseType = "json";
      this.xhr.send();
      this.xhr.onload = function () {
         if (this.xhr.status !== 200) {
            console.error(`${this.xhr.status}: ${this.xhr.statusText}`);
         } else {
            try { 
               return JSON.parse(this.xhr.responce);
            } catch (err) { 
               console.error(err);
            }
         }
      }.bind(this);
      this.xhr.onerror = function () {
         console.error("Request is failed!");
      }
   }
}

const rickandmortyCharacter = new RequestList({
   url: "https://rickandmortyapi.com/api/character/"
});