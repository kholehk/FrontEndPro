"use strict";

const container = document.querySelector("main .container");

if (container !== null) { 

   let validEmail = false;
   let validPassword = false;

   const formLogin = document.createElement("form");
   formLogin.classList.add("login");
   formLogin.name = "login";
   container.appendChild(formLogin);
   formLogin.addEventListener("submit", submitLogin);

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
   inputEmail.addEventListener("change", changeEmail);

   const labelPassword = createLabel(
      { text: "Input password: ", parent: formLogin }
   );
   labelPassword.classList.add("password");

   const inputPassword = createInput(
      {
         type: "password",
         info: "passw",
         parent: labelPassword,
      }
   );
   inputPassword.addEventListener("change", changePassword);

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

   function changeEmail(event) {
      validEmail = true;
      inputEmail.style.border = "";
      if (event.target.value === "") {
         validEmail = false;
         inputEmail.style.border = "2px solid red";
      }
      changeButtonSubmit();
   }

   function changePassword(event) {
      validPassword = true;
      inputPassword.style.border = "";
      if (event.target.value === "") {
         validPassword = false;
         inputPassword.style.border = "2px solid red";
      }
      changeButtonSubmit();
   }

   function changeButtonSubmit () { 
      buttonSubmit.disabled = true;
      if (validEmail && validPassword)
         buttonSubmit.disabled = false;
   }

   function changeVisibilityPass(event) {
      inputPassword.type = inputPassword.type === "password" ? "text" : "password";
      event.target.innerText = inputPassword.type === "password" ? "Show" : "Hide";
   }

   function submitLogin(event) {
      event.preventDefault();
      const login = {
         email: inputEmail.value,
         password: inputPassword.value
      };
      inputEmail.value = "";
      inputPassword.value = "";

      console.log(`Email: ${ login.email }\nPassword: ${ login.password }`);
   }
}

function createLabel(props) { 

   const label = document.createElement("label");
   label.innerText = props.text || "";
   props.parent.appendChild(label);

   return label;
}

function createInput(props) { 

   const input = document.createElement("input");
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
   button.type = props.type;
   button.innerText = props.text || "";
   button.disabled = props.disabled;
   props.parent.appendChild(button);

   return button;
}