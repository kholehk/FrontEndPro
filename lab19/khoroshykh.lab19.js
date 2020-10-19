"use strict";

const buttonTypes = Object.freeze({
   prev: "PREV PAGE",
   next: "NEXT PAGE"
});

class Button { 
   constructor(type) { 
      this.button = document.createElement("button");
      this.button.type = "button";
      this.button.innerText = buttonTypes[type];
      this.button.dataset.func = type;
   }

   set disabled(flag) { 
      this.button.disabled = flag;
   }

   get disabled() { 
      return this.button.disabled;
   }
}


class RequestList { 
   constructor(props) { 
      if (!props || !props.url || !props.container) return;
      this._url = new URL(props.url);
      //this._url.searchParams.set("page", 1);

      this.init(props.container);
      this.page = 1;

      this._amounItems = 0;
      this._info = {};
      this._results = [];
      this.request();
   }

   init(container) { 

      this._list = document.createElement("ol");
      container.appendChild(this._list);

      let nav = document.createElement("nav");
      container.appendChild(nav);
      nav.addEventListener("click", (event) => { 
         let func = event.target.dataset.func;
         if (!func) return;

         this._url = new URL(this._info[func]);
         this.request();
         this.page = this._url.searchParams.get("page");
      });

      this._prev = new Button("prev");
      nav.appendChild(this._prev.button);

      this._page = document.createElement("span");
      this._page.style.margin = "15px";
      nav.appendChild(this._page);

      this._next = new Button("next");
      nav.appendChild(this._next.button);
   }

   set page(number) {
      this._page.innerText = number;
   }

   get page() { 
      return this._page.innerText;
   }

   request() {

      fetch(this._url)
         .then(response => { if (response.status === 200) { return response.json(); } })
         .then(({ info, results }) => {
            this._info = info;
            this._results = results;
            this._amounItems = this._amounItems || results.length;
            this.render();
         })
         .catch(err => console.error(err));

      // const xhr = new XMLHttpRequest();

      // xhr.open("GET", this._url);
      // xhr.send();

      // xhr.onload = function () {
      //    if (xhr.status !== 200) {
      //       console.error(`${xhr.status}: ${xhr.statusText}`);
      //    } else {
      //       try {
      //          this._responseRequest = JSON.parse(xhr.response);
      //       }
      //       catch (err) {
      //          console.error(err);
      //       }
      //       this.render();
      //    }
      // }.bind(this);

      // xhr.onerror = function () {
      //    console.error("Request is failed!");
      // }
   }

   render() { 
      this._list.innerHTML = "";
      this._results
         .map(elem => elem.name)
         .forEach(name => {
            let li = document.createElement("li");
            li.innerText = name;
            this._list.appendChild(li);
         });
         
      const { prev, next } = this._info;
      this._list.firstChild.value = (this.page - 1) * this._amounItems + 1;
      this._prev.disabled = !prev;
      this._next.disabled = !next;
   }
}


const container = document.querySelector(".container");
if (container) {

   const episode = document.createElement("div");
   episode.innerHTML = "<h1>Episode</h1>";
   container.appendChild(episode);

   const rickandmortyEpisode = new RequestList({
      url: "https://rickandmortyapi.com/api/episode/",
      container: episode,
   });

   const character = document.createElement("div");
   character.innerHTML = "<h1>Character</h1>";
   container.appendChild(character);

   const rickandmortyCharacter = new RequestList({
      url: "https://rickandmortyapi.com/api/character/",
      container: character,
   });
}
