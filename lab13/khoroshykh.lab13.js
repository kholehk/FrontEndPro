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
         info: "email", 
         parent: labelEmail,
      }
   );

   const labelPassword = createLabel(
      { text: "Input password: ", parent: formLogin }
   );

   const inputPassword = createInput(
      {
         type: "password",
         info: "passw",
         parent: labelPassword,
      }
   );

   const buttonSubmit = createButton(
      {
         type: "submit",
         text: "Login",
         parent: formLogin,
      }
   );
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
   props.parent.appendChild(button);

   return button;
}