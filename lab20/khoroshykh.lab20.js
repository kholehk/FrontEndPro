"use strict";

const typePost = Object.freeze({
   user: "chat_user",
   bot: "chat_bot",
});

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

class Bot { 
   constructor() { 

      this._hasAnswer = true;
      this._startAnswer = ["Hi"];
      this._stopAnswer = ["Bye"];
      this._listAnswers = ["Hi", "How are you?", "Weather is fine, today", "Bye"];

   }

   async addPost(message) {
      await Chat.wait(Chat.randomFromRange(1000, 3000));
      this.addPost(message, typePost.bot);
   }

   static wait(delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
   }

   static randomFromRange(...arg) {
      const [first, last] = arg.length === 1 ? [0, arg[0]] : arg;

      const random = Math.round(Math.random() * last * 10) % last;
      return random < first ? first : random;
   }
}

class Chat { 
   constructor(container) {
      if (!container) return;
  
      this._listPosts = document.createElement("ul");
      this._listPosts.classList.add("chat");
      container.appendChild(this._listPosts);

      this._formAddPost = document.createElement("form");
      this._formAddPost.addEventListener("submit", async (event) => {
         event.preventDefault();
         this.addPost(this.inputPost, typePost.user);
         this.clearInputPost();
         await Chat.wait(Chat.randomFromRange(1000, 3000));
         this.addPost("Hi!", typePost.bot);
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

   static wait(delay) {
      return new Promise(resolve => setTimeout(resolve, delay));
   }

   static randomFromRange(...arg) {
      const [first, last] = arg.length === 1 ? [0, arg[0]] : arg;

      const random = Math.round(Math.random() * last * 10) % last;
      return random < first ? first : random;
   }
}

const container = document.querySelector(".container");

const myChat = new Chat(container);