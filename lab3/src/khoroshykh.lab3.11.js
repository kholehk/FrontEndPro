const winNumber = Math.round(Math.random() * 10);
console.log(winNumber);

let answerNumber;
count = 1;

while (true) {
  answerNumber = prompt("Відгадай число від 0 до 10 :)");
  console.log(answerNumber);
  if (answerNumber === null) {
    alert(`На жаль Ви не вгадали :(`);
    break;
  }
  if (answerNumber !== "") {
    if (+answerNumber === winNumber) {
      alert(`Вітаємо! Ви вгадали з ${count} спроби :)`);
      break;
    }
  }
  count++;
}
