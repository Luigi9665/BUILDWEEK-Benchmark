let globalScore = 0;
let questionNumber = 0;
let amount = 5;
let difficulty = "easy";
let url = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}`;
const questionContainer = document.querySelector(".answers");
// gestione del timer

// manipolazione dell'elemento per i secondi
// maniupolazione del div per il gradiente
// variabile globale per le risposte giuste
// variabile globale per le domande totali
// estrapolare domande da api (fetch)

const randomAnswers = (data) => {
  const allAnswers = [...data[questionNumber].incorrect_answers];

  const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
  allAnswers.splice(randomIndex, 0, data[questionNumber].correct_answer);
  return allAnswers;
};
const questions = (data) => {
  if (questionNumber >= apiData.length) {
    localStorage.setItem("score", globalScore);
    localStorage.setItem("questionNumber", questionNumber);
    window.location.href = "results.html";
  }
  const title = data[questionNumber].question;
  console.log(title);
  const answers = randomAnswers(data);
  console.log(answers);
  const h1 = document.querySelector("h1");
  h1.innerHTML = title;
  questionContainer.innerHTML = "";
  for (let i = 0; i < answers.length; i++) {
    const element = answers[i];
    const divAnswer = document.createElement("div");
    divAnswer.classList.add("answer");
    const buttonAnswer = document.createElement("button");
    buttonAnswer.innerHTML = element;
    divAnswer.appendChild(buttonAnswer);
    questionContainer.appendChild(divAnswer);
  }
  questionNumber++;
  actualQuestion.innerText = questionNumber;
};
const timer = 30;
const divTimer = document.getElementById("timer");
const seconds = document.querySelector(".second");
let lessTime = timer;
let interval;
const startTimer = () => {
  clearInterval(interval);
  lessTime = timer;
  interval = setInterval(() => {
    lessTime--;
    if (lessTime < 0) {
      clearInterval(interval);
      lessTime = 0;
      startTimer();
      questions(apiData);
      return;
    }
    seconds.innerText = lessTime;
    const angle = (lessTime / timer) * 360;
    divTimer.style.background = `conic-gradient( rgba(255,255,255,0.1) 0deg ${360 - angle}deg, #00ffff ${360 - angle}deg 360deg)`;
  }, 1000);
};

const checkNext = document.querySelector(".btn-general");
checkNext.addEventListener("click", () => {
  controlloRisposta(apiData);
  setTimeout(() => {
    if (questionNumber >= apiData.length) {
      localStorage.setItem("score", globalScore);
      localStorage.setItem("questionNumber", questionNumber);
      window.location.href = "results.html";
    }
    questions(apiData);
    startTimer();
  }, 2000);
});

const actualQuestion = document.getElementById("counter-answer");
const totalQuestion = document.getElementById("quantity-question");

totalQuestion.innerText = amount;

questionContainer.addEventListener("click", (event) => {
  const allBtn = document.querySelectorAll("#check");
  allBtn.forEach((btn) => {
    btn.removeAttribute("id");
  });
  if (event.target.tagName === "BUTTON") {
    event.target.id = "check";
  }
});

const normalize = (str) => {
  return str
    .trim() // rimuove spazi
    .toLowerCase() // case-insensitive
    .replace(/&quot;/g, '"') // decodifica alcune entity comuni
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};
const controlloRisposta = (apiData) => {
  const correctAnswer = document.querySelector("#check");
  const textButton = correctAnswer.innerHTML;
  const textCorrect = normalize(apiData[questionNumber - 1].correct_answer);
  const allBtn = questionContainer.querySelectorAll("button");
  for (let i = 0; i < allBtn.length; i++) {
    const element = allBtn[i].innerHTML;
    if (normalize(element) === textCorrect) {
      allBtn[i].style.background = "green";
    }
  }
};

let apiData = [];
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    apiData = data.results;
    console.log(data.results);
    questions(apiData);
    startTimer();
  });

// estrapolare domande per i button
// rendere dinamici i button
// rendere casuali i button
// implementare cambio domanda al termine del timer
// rendere dinamico il button next
