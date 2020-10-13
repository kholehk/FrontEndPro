"use strict";

class RequestList { 
   constructor(props) { 
      if (!props || !props.url) return;

      this.url = new URL(props.url);
      this.url.searchParams.set("page", "1");

      this.xhr = new XMLHttpRequest();
      this.xhr.timeout = 10000;
      this.xhr.open("GET", this.url);
      this.xhr.send();

      this.xhr.onload = function () {
         if (this.xhr.status !== 200) {
            console.error(`${this.xhr.status}: ${this.xhr.statusText}`);
         } else {
            this.render();
         }
      }.bind(this);

      this.xhr.onerror = function () {
         console.error("Request is failed!");
      }
   }

   get names() {
      try {
         return JSON.parse(this.xhr.response).results.map(elem => elem.name);
      }
      catch (err) {
         console.error(err);
         return [];
      }
   }

   render() { 
      console.log(this.names);
   }
}

const rickandmortyCharacter = new RequestList({
   url: "https://rickandmortyapi.com/api/character/"
});