"use strict";


const buttonTypes = Object.freeze({
   submit: "SEND",
   send: "SEND",
});

class Element { 
   constructor(tag) { 
      this._element = document.createElement(tag);;
   }

   get element() { 
      return this._element;
   }
}

class Button extends Element {
   constructor(type) {
      super("button");

      [this.element.type, this.element.dataset.id] = type === "submit" ? ["submit", ""] : ["button", type];
      this.element.innerText = buttonTypes[type];
   }

   set disabled(flag) {
      this.element.disabled = flag;
   }

   get disabled() {
      return this.element.disabled;
   }
}

class Input extends Element { 
   constructor(text) {
      super("input");
      this.element.placeholder = text;
   }
}

class Post extends Element { 
   constructor(message) { 
      super("li");
      this.message = message;
   }

   set message(content) { 
      this.element.innerHTML = content;
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
         this.addPost(this.inputPost, "chat_user");
         this.clearInputPost();
      });
      container.appendChild(this._formAddPost);

      this._inputPost = new Input("input your message");
      this._formAddPost.appendChild(this._inputPost.element);

      this._sendPost = new Button("submit");
      this._formAddPost.appendChild(this._sendPost.element);
   }

   get inputPost() { 
      return this._inputPost.element.value;
   }

   clearInputPost() { 
      this._inputPost.element.value = "";
   }

   addPost(message, whose) {
      if (!message) return;

      const post = new Post(message);
      post.element.classList.add(whose);
      this._listPosts.appendChild(post.element);
   }
}

const BOT_POSTS = ["Hi, there!", "How are you?", "i'm fine :)", "Bye, bye", "Weather is ugly, today"];
const container = document.querySelector(".container");

const myChat = new Chat(container);
talkativeBot(myChat);

async function talkativeBot(chat) { 
   BOT_POSTS.forEach(async (msg) => {
      await wait(10000);
      await chat.addPost(msg, "chat_bot");
   });
}

function wait(delay) {
   return new Promise(resolve => setTimeout(resolve, delay));
}