"use strict";

class RequestList { 
   constructor(props) { 
      if (!props || !props.url) return;

      this._url = new URL(props.url);

      this.xhr(1);
      this.render();
   }

   xhr(page) {
      this._url.searchParams.set("page", page);

      const xhr = new XMLHttpRequest();
      xhr.timeout = 10000;
      xhr.open("GET", this._url);
      xhr.send();

      xhr.onload = function () {
         this._names = [];
         if (xhr.status !== 200) {
            console.error(`${xhr.status}: ${xhr.statusText}`);
         } else {
            try {
               this._names = JSON.parse(xhr.response).results.map(elem => elem.name);
            }
            catch (err) {
               console.error(err);
            }
         }
      }.bind(this);

      xhr.onerror = function () {
         console.error("Request is failed!");
         this._names = [];
      }
   }

   render() { 
      console.log(this._names);
   }
}

const rickandmortyCharacter = new RequestList({
   url: "https://rickandmortyapi.com/api/character/"
});