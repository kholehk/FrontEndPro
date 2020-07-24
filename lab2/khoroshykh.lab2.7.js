const userName = prompt("Ваше ім'я?");
const userAge = +prompt("Скільки Вам років?");

if (!isNaN(userAge)) {
  const isAlcogol = confirm("Ви вживаєте алкоголь?");

  if (userAge <= 18) {
    isAlcogol
      ? alert(`Ти що, ${userName}?! Мамі розкажу!`)
      : alert(`Так тримати, ${userName}!`);
  } else if (userAge <= 40) {
    isAlcogol
      ? alert(`${userName}! Тільки горілку з пивом не мішайте...`)
      : alert(`Так тримати, ${userName}!`);
  } else {
    isAlcogol
      ? alert(`Не зловживайте, ${userName}.`)
      : alert(`Так тримати, ${userName}!`);
  }
}
