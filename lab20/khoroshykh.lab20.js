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
   constructor(message, style) { 
      super("li");
      this.message = message;
      this.element.classList.add(style);
   }

   set message(content) { 
      this.element.innerHTML = content;
   }
}

class Form extends Element {
   constructor(cb) { 
      super("form");
      this.element.addEventListener("submit", event => cb(event));
   }
}

class List extends Element { 
   constructor(style) { 
      super("ul");
      this.element.classList.add(style);
   }
}

class Bot {
   constructor() {
      this._postsForAnswer = [];
      this._listAnswers = ["Hi", "How are you?", "I'm fine", "Weather is ugly, today", "Thats all, wolks", "Bye"];
      this._stopPosts = ["Bye", "Good Bye", "Bye, bye"];
      this._stopBot = false;
   }

   addPost(message) {
      this._postsForAnswer.push(message);
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

class Chat extends Bot {
   constructor(container) {
      super();
      if (!container) return;

      this._listPosts = new List("chat");
      container.appendChild(this._listPosts.element);

      this._formAddPost = new Form((event) => this.submit(event));
      container.appendChild(this._formAddPost.element);

      this._inputPost = new Input("input your message");
      this._formAddPost.element.appendChild(this._inputPost.element);

      this._sendPost = new Button("submit");
      this._formAddPost.element.appendChild(this._sendPost.element);
   }

   get inputPost() {
      return this._inputPost.element.value;
   }

   clearInputPost() {
      this._inputPost.element.value = "";
   }

   addPost(message, style) {
      if (!message) return;
      super.addPost(message);

      const post = new Post(message, style);
      this._listPosts.element.appendChild(post.element);
      this._listPosts.element.scrollTo(0, 100000); //correct later
   }

   submit(event) {
      event.preventDefault();

      this.addPost(this.inputPost, typePost.user);
      this.clearInputPost();
   }
}

const container = document.querySelector(".container");

const myChatBot = new Bot(container);