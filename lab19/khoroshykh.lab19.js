"use strict";

class RequestList { 
   constructor(props) { 
      if (!props || !props.url) return;
      this._url = new URL(props.url);
      //this._url.searchParams.set("page", 1);

      let container = document.querySelector(props.container);
      container = container ? container : document.querySelector("body");
      this.init(container);

      this._responseRequest = {};
      this.request()
         .then(resolve => this.render())
         .catch(console.error("Request is failed!"));
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

      // this._prev = document.createElement("button");
      // this._prev.type = "button";
      // this._prev.innerText = "PREV";
      // this._prev.dataset.func = "prev";
      // nav.appendChild(this._prev);
      nav.appendChild(this.createButton({ text:"<---", func:"prev" }));

      this._page = document.createElement("span");
      this._page.innerText = "1";
      nav.appendChild(this._page);

      nav.appendChild(this.createButton({ text: "--->", func: "next" }));
      // this._next = document.createElement("button");
      // this._next.type = "button";
      // this._next.innerText = "NEXT";
      // this._next.dataset.func = "next";
      // nav.appendChild(this._next);
   }

   createButton(buttonDescript) { 

      this[`_${buttonDescript.func}`] = document.createElement("button");
      this[`_${buttonDescript.func}`].type = "button";
      this[`_${buttonDescript.func}`].innerText = buttonDescript.text;
      this[`_${buttonDescript.func}`].dataset.func = buttonDescript.func;
      
      return this[`_${buttonDescript.func}`];
   }

   request() {

      return fetch(this._url)
         .then(response => {
            if (response.status === 200) { 
               this._responseRequest = response.json();
            } else {
               throw new Error(`Error loading data: ${response.status}`);
            }
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
      this._list.firstChild.value = this._page.innerText * 20 - 19;
      this._prev.disabled = !this._responseRequest.info.prev;
      this._next.disabled = !this._responseRequest.info.next;
   }
}

const rickandmortyCharacter = new RequestList({
   url: "https://rickandmortyapi.com/api/character/",
   container: ".container",
});