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
      this._element = document.createElement(tag);
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

class Comment extends Element { 
   constructor(text) { 
      super("p");
      this.element.innerHTML = `<i>${text}</i>`;
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

   add(element) { 
      this.element.appendChild(element);
   }
}

class Bot {
   constructor() {
      this._postsForAnswer = [];
      this._listAnswers = ["Hi", "How are you?", "I'm fine", "Weather is ugly, today", "Bla-bla-bla-...", "Thats all, wolks", "Bye"];
      this._stopPosts = ["Bye", "Good Bye", "Bye, bye"];
      this._stopBot = false;
   }

   addPost(message) {
      this._postsForAnswer.push(message);
   }

   sendPost() { 
      if (this._stopBot) return "Bye";

      const idx = Bot.randomFromRange(0, this._listAnswers.length - 1);

      return this._listAnswers[idx];
   }
   
   async listenChat() { 
      return new Promise((result, reject) => {

         if (this._stopBot) {

            reject(new ChatError(0, "Bot is stoped"));

         } else if (!this._postsForAnswer.length) {
            
            reject(new ChatError(1, "Bot is wait"));

         } else {

            this._stopBot = this._postsForAnswer[0] === "Bye";
            this._postsForAnswer = this._postsForAnswer.slice(1);

            result(this.sendPost());
         }
      });
   }

   static async wait(delay) {
      return new Promise(result => setTimeout(result, delay));
   }

   static randomFromRange(...arg) {
      const [first, last] = arg.length === 1 ? [0, arg[0]] : arg;

      const random = Math.round(Math.random() * last * 10) % last;
      return random < first ? first : random;
   }
}

class ChatError extends Error { 
   constructor(err, msg) { 
      super(msg);
      this._code = err;
   }
}

class Chat extends List {
   constructor(container) {
      super("chat");

      if (!container && !(container instanceof HTMLElement)) return;

      container.appendChild(this.element);

      const formAddPost = new Form((event) => this.submit(event));
      container.appendChild(formAddPost.element);

      const inputPost = new Input("input your message");
      formAddPost.element.appendChild(inputPost.element);

      this._sendPost = new Button("submit");
      formAddPost.element.appendChild(this._sendPost.element);
      
      const comment = new Comment("* Please, say \"Bye\", for stop this Bot.");
      formAddPost.element.appendChild(comment.element);

      this._myBot = new Bot();
      this._listner = setInterval(() => this.listen(), 0);
   }

   addPost(message, style) {
      if (!message) return;

      const post = new Post(message, style);
      this.add(post.element);

      this.element.scrollTo(0, this.element.scrollHeight);
   }

   submit(event) {
      event.preventDefault();

      const msg = event.target.querySelector("input").value;

      this.addPost(msg, typePost.user);
      this._myBot.addPost(msg);
      
      event.target.querySelector("input").value = "";
   }

   async listen() {
      try { 
         const msg = await this._myBot.listenChat();

         await Bot.wait(Bot.randomFromRange(1000, 3000));
         this.addPost(msg, typePost.bot);

      } catch (err) { 
         if (!err._code && this._listner) { 
            clearInterval(this._listner);
            this._listner = null;
         }
      }
   }
}

const container = document.querySelector(".container");

const myChatBot = new Chat(container);