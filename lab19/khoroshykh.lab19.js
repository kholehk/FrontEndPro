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
}


class RequestList { 
   constructor(props) { 
      if (!props || !props.url) return;
      this._url = new URL(props.url);
      //this._url.searchParams.set("page", 1);

      let container = document.querySelector(props.container);
      container = container ? container : document.querySelector("body");
      this.init(container);

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

         this._url = new URL(this._responseRequest.info[func]);
         this.request();
         this._page.innerText = this._url.searchParams.get("page");
      });

      this._prev = new Button("prev");
      nav.appendChild(this._prev.button);

      this._page = document.createElement("span");
      this._page.innerText = "1";
      nav.appendChild(this._page);

      this._next = new Button("next");
      nav.appendChild(this._next.button);
   }
   
   request() {

      fetch(this._url)
         .then(result => { if (result.status === 200) { return result.json(); } })
         .then(response => {
            this._info = response.info;
            this._results = response.results;
            this._amounItems = this._amounItems || response.results.length;
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
      this._responseRequest.results
         .map(elem => elem.name)
         .forEach(name => {
            let li = document.createElement("li");
            li.innerText = name;
            this._list.appendChild(li);
         });
         
      const { prev, next } = this._responseRequest.info;
      this._list.firstChild.value = (this._page.innerText - 1) * this._amounItems + 1;
      this._prev.button.disabled = !prev;
      this._next.button.disabled = !next;
   }
}

const rickandmortyEpisode = new RequestList({
   url: "https://rickandmortyapi.com/api/episode/",
   container: ".container",
});