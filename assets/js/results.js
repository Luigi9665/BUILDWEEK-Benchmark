const score = localStorage.getItem("score");
const numberQuestion = localStorage.getItem("numberQuestion");
console.log(score);
console.log(numberQuestion);
let correctPerc = (score / numberQuestion) * 100;
console.log(correctPerc);
let wrongPerc = 100 - correctPerc;
let wrongQuestion = numberQuestion - score;
console.log(wrongPerc);
// circleEl.style.background = `conic-gradient(rgba(255,255,255,0.1) 0deg ${360 - angle}deg, #00ffff ${360 - angle}deg 360deg)`;
// background: conic-gradient(from 120deg, #00ffff 0% 66.7%, #e843c4 66.7% 100%);
// .stats-box-circle
// .stats-box-numbers span percentuale correct
// .stats-box-questions p differenza correct
// .stats-box-numbers-2 span percentuale wrong
// .stats-box-questions-2 p differenza wrong
// .stats-box-title Congratulations! Unfortunately
// .stats-box-subtitle You passed the exam. You failed the exam.

// Gestione del circle
const divCircle = document.querySelector(".stats-box-circle");
divCircle.style.background = `conic-gradient(from -72deg, #00ffff 0% ${correctPerc}%, #e843c4 ${correctPerc}% ${wrongPerc}%)`;

// gestione percentuale risposte corrette
const spanCorrect = document.querySelector(".stats-box-numbers");
spanCorrect.innerHTML = `${correctPerc}%`;
const pCorrect = document.querySelector(".stats-box-questions");
pCorrect.innerHTML = `${score}/${numberQuestion} question`;

// gestione percentuale risposte sbagliate
const spanWrong = document.querySelector(".stats-box-numbers-2");
spanWrong.innerHTML = `${wrongPerc}%`;
const pWrong = document.querySelector(".stats-box-questions-2");
pWrong.innerHTML = `${wrongQuestion}/${numberQuestion} question`;

// Gestione del testo
const title = document.querySelector(".stats-box-title");
const subtitle = document.querySelector(".stats-box-subtitle");
if (correctPerc > 60) {
  title.innerHTML = "Congratulations!";
  subtitle.innerHTML = "You passed the exam.";
} else {
  title.innerHTML = "Unfortunately!";
  subtitle.innerHTML = "You failed the exam.";
}
