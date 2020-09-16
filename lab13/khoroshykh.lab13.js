"use strict";

const container = document.querySelector("main .container");

if (container !== null) { 

   const formLogin = document.createElement("form");
   formLogin.classList.add("login");
   formLogin.name = "login";
   container.appendChild(formLogin);

   const labelEmail = createLabel(
      { text: "Input Email: ", parent: formLogin }
   );

   const inputEmail = createInput(
      {
         type: "text",
         placeholder: "Your Email",
         // info: "email", 
         parent: labelEmail,
      }
   );
   inputEmail.addEventListener("change", isValidEmail);

   const labelPassword = createLabel(
      { text: "Input password: ", parent: formLogin }
   );
   labelPassword.classList.add("password");

   const inputPassword = createInput(
      {
         type: "password",
         // info: "passw",
         parent: labelPassword,
      }
   );

   const buttonPassword = createButton(
      {
         type: "button",
         text: "Show",
         parent: labelPassword,
      }
   );
   buttonPassword.classList.add("password_button");
   buttonPassword.addEventListener("click", changeVisibilityPass);

   const buttonSubmit = createButton(
      {
         type: "submit",
         text: "Login",
         disabled: true,
         parent: formLogin,
      }
   );
   buttonSubmit.addEventListener("submit", loginSubmit);
}

function createLabel(props) { 

   const label = document.createElement("label");
   label.innerText = props.text || "";
   props.parent.appendChild(label);

   return label;
}

function createInput(props) { 

   const input = document.createElement("input");
   if (props.type)
      input.type = props.type;
   if (props.placeholder)
      input.placeholder = props.placeholder;
   if (props.info)
      input.dataset.info = props.info;
   props.parent.appendChild(input);

   return input;
}

function createButton(props) { 
   const button = document.createElement("button");
   if (props.type)
      button.type = props.type;
   button.innerText = props.text || "";
   button.disabled = props.disabled;
   props.parent.appendChild(button);

   return button;
}

function isValidEmail(event) { 
   const result = /\w\@\w/.test(event.target.value);
   console.log(result);
}

function changeVisibilityPass(event) {
   const inputPassword = event.target.previousSibling; 
   inputPassword.type = inputPassword.type === "password" ? "text" : "password";
   event.target.innerText = inputPassword.type === "password" ? "Show" : "Hide";
}

function loginSubmit(event) {
   debugger;
}