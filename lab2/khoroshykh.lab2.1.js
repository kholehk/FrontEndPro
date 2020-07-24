const nameUser = prompt("What is your name?");
const yearBirthUser = prompt("What year of your birth?");
const howOld = 2020 - yearBirthUser;

alert(
  `${nameUser}: ${
    isNaN(howOld) || howOld < 0 ? `Wrong year of your birth` : `${howOld} years`
  }`
);

console.log(nameUser, howOld);
