"use strict";


const buttonTypes = Object.freeze({
   submit: "SEND",
   send: "SEND",
});

class Button {
   constructor(type) {
      this._button = document.createElement("button");
      [this._button.type, this._button.dataset.id] = type === "submit" ? ["submit", ""] : ["button", type];
      this._button.innerText = buttonTypes[type];
   }

   set disabled(flag) {
      this._button.disabled = flag;
   }

   get disabled() {
      return this._button.disabled;
   }

   render() { 
      return this._button;
   }
}

class Input { 
   constructor(text) { 
      this._input = document.createElement("input");
      this._input.placeholder = text;
   }

   render() { 
      return this._input;
   }
}

class Chat { 
   constructor(container) {
      if (!container) return;

      this._listPosts = document.createElement("ul");
      this._listPosts.classList.add("chat");
      container.appendChild(this._listPosts);

      this._formAddPost = document.createElement("form");
      this._formAddPost.addEventListener("submit", (event) => {
         event.preventDefault();
         this.addPost(this.newPost);
      });
      container.appendChild(this._formAddPost);

      this._newPost = new Input("input your message");
      this._formAddPost.appendChild(this._newPost.render());

      this._sendPost = new Button("submit");
      this._formAddPost.appendChild(this._sendPost.render());
   }

   get newPost() { 
      return this._newPost.render().value;
   }

   addPost(post) { 
      console.log(post);
   }
}

const container = document.querySelector(".container");

new Chat(container);