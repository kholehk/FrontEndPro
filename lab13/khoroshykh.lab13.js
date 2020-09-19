"use strict";

const _EMAIL = "email";
const _PASSW = "password";
const container = document.querySelector("main .container");

if (container !== null) { 

   // let validEmail = false;
   // let validPassword = false;

   const validForm = {
      [_EMAIL]: false,
      [_PASSW]: false
   }

   const formLogin = document.createElement("form");
   formLogin.classList.add("login");
   formLogin.name = "login";
   container.appendChild(formLogin);
   formLogin.addEventListener("submit", submitLogin);
   formLogin.addEventListener("change", changeInput);

   const labelEmail = createLabel(
      { text: "Input Email: ", parent: formLogin }
   );

   const inputEmail = createInput(
      {
         type: "text",
         placeholder: "Your Email",
         key: _EMAIL, 
         parent: labelEmail,
      }
   );
   // inputEmail.addEventListener("change", changeEmail);

   const labelPassword = createLabel(
      { text: "Input password: ", parent: formLogin }
   );
   labelPassword.classList.add("password");

   const inputPassword = createInput(
      {
         type: "password",
         key: _PASSW,
         parent: labelPassword,
      }
   );
   // inputPassword.addEventListener("change", changePassword);

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

   // function changeEmail(event) {

   //    validEmail = true;
   //    inputEmail.style.border = "";

   //    const value = event.target.value;
   //    if (!/^([-.\w]+@([\w-]+\.)+[\w-]+)$/.test(value)) {
   //       validEmail = false;
   //       inputEmail.style.border = value !== "" ? "2px solid red" : "";
   //    }

   //    changeButtonSubmit();
   // }

   // function changePassword(event) {

   //    validPassword = true;
   //    inputPassword.style.border = "";

   //    const value = event.target.value;
   //    if (!/\d/.test(value) || !/^([@$#!?&\w]{8,})$/.test(value)) {
   //       validPassword = false;
   //       inputPassword.style.border = value !== "" ? "2px solid red" : "";
   //    }

   //    changeButtonSubmit();
   // }

   function changeInput(event) {

      const key = event.target.dataset.key;
      if (!key) return;

      const value = event.target.value;

      validForm[key] = isValidInput({ key, value });
      event.target.style.border = (validForm[key] || value === "") ? "" : "2px solid red";

      buttonSubmit.disabled = !(validForm[_EMAIL] && validForm[_PASSW]);
   }

   function isValidInput(props) { 
      switch (props.key) {
         case _EMAIL:
            return /^([-.\w]+@([\w-]+\.)+[\w-]+)$/.test(props.value);
         case _PASSW:
            return /\d/.test(props.value) && /^([@$#!?&\w]{8,})$/.test(props.value);
         default:
            return false;
      }
   }

   // function changeButtonSubmit() {
   //    buttonSubmit.disabled = true;
   //    if (valid[_EMAIL] && valid[_PASSW])
   //       buttonSubmit.disabled = false;
   // }

   function changeVisibilityPass(event) {
      inputPassword.type = inputPassword.type === "password" ? "text" : "password";
      event.target.innerText = inputPassword.type === "password" ? "Show" : "Hide";
   }

   function submitLogin(event) {
      event.preventDefault();
      const login = {
         [_EMAIL]: inputEmail.value,
         [_PASSW]: inputPassword.value
      };
      inputEmail.value = "";
      inputPassword.value = "";
      buttonSubmit.disabled = true;

      console.log(login);
   }
}

function createLabel(props) { 

   const label = document.createElement("label");
   
   if (props) { 
      label.innerText = props.text || "";
      props.parent.appendChild(label);
   }

   return label;
}

function createInput(props) { 

   const input = document.createElement("input");

   if (props) {
      input.type = props.type;
      input.placeholder = props.placeholder || "";
      input.dataset.key = props.key ||"";
      props.parent.appendChild(input);
   }

   return input;
}

function createButton(props) { 

   const button = document.createElement("button");

   if (props) {
      button.type = props.type;
      button.innerText = props.text || "";
      button.disabled = props.disabled || false;
      props.parent.appendChild(button);
   }

   return button;
}