let globalScore = 0;
let questionNumber = 0;
let questions = [];
let totalTime = 30; // secondi totali
let interval;
let remaining = totalTime; //secondi che dovranno diminuire
let difficulty = "easy";
let amount = 8;
let category = 18; // computer science / coding
let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
const divQuestion = document.querySelector(".question");
const divAnswers = document.querySelector(".answers");
const btnNext = document.querySelector(".btn-general");
const secondEl = document.querySelector(".second");
const circleEl = document.getElementById("timer");

//settaggio footer per numero totale delle domande e numero della domanda in esecuzione
const numberQuestion = (amount) => {
  const spanQuantity = document.getElementById("quantity-question");
  spanQuantity.innerText = `/${amount}`;
  const spanQuestion = document.getElementById("counter-answer");
  spanQuestion.innerText = `${questionNumber + 1}`;
};

//inserimento della risposta giusta nelle risposte generali e randomizzo l'ordine
const randomizeAnswers = (data) => {
  const allAnswers = [...data[questionNumber].incorrect_answers];
  const randomIndex = Math.floor(Math.random() * (allAnswers.length + 1));
  allAnswers.splice(randomIndex, 0, data[questionNumber].correct_answer);
  return allAnswers;
};

//generazione della question
const generateQuestion = (data) => {
  if (questionNumber >= questions.length) {
    localStorage.setItem("score", globalScore);
    localStorage.setItem("numberQuestion", questionNumber);
    window.location.href = "results.html";
    return;
  }
  const allAnswers = randomizeAnswers(data);
  divQuestion.querySelector("h1").innerHTML = data[questionNumber].question;
  divAnswers.innerHTML = ""; // cancella le risposte precedenti
  for (let i = 0; i < allAnswers.length; i++) {
    const element = allAnswers[i];
    const divAnswer = document.createElement("div");
    divAnswer.classList.add("answer"); // aggiungo la classe
    const buttonAnswer = document.createElement("button"); // Creo il button
    buttonAnswer.innerHTML = element;
    divAnswer.appendChild(buttonAnswer); // Inserisco il button nel div
    divAnswers.appendChild(divAnswer); // Inserisco il divAnswer nel contenitore principale
  }
  questionNumber++;
};

divAnswers.addEventListener("click", (event) => {
  document.querySelectorAll("#check").forEach((btn) => {
    btn.removeAttribute("id");
  });
  if (event.target.tagName === "BUTTON") {
    event.target.id = "check";
  }
});

// codificare le stringhe per evitare caratteri speciali
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

// controllo risposta corretta
const checkCorrectAnswer = (questions) => {
  const btnCheck = document.querySelector("#check");
  const comparate = btnCheck.innerHTML;
  if (normalize(comparate) === normalize(questions[questionNumber - 1].correct_answer)) {
    globalScore++;
    btnCheck.removeAttribute("id");
    let times = 0;
    const flashInterval = setInterval(() => {
      btnCheck.classList.toggle("flash");
      times++;
      if (times === 6) {
        // 6 toggle = 3 lampeggi
        clearInterval(flashInterval);
        btnCheck.classList.remove("flash"); // sicuro rimane spento
      }
    }, 300);
  } else {
    const allBtn = divAnswers.querySelectorAll("button");
    for (let i = 0; i < allBtn.length; i++) {
      const element = allBtn[i].innerHTML;
      if (normalize(element) === normalize(questions[questionNumber - 1].correct_answer)) {
        let times = 0;
        const flashInterval = setInterval(() => {
          allBtn[i].classList.toggle("flash");
          times++;
          if (times === 6) {
            // 6 toggle = 3 lampeggi
            clearInterval(flashInterval);
            allBtn[i].classList.remove("flash"); // sicuro rimane spento
          }
        }, 300);
      }
    }
  }
};

// event Listener del button next, con controllo risposta e avanzamento question
btnNext.addEventListener("click", () => {
  checkCorrectAnswer(questions);
  // attendi 2 secondi prima di generare la prossima domanda
  setTimeout(() => {
    if (questionNumber >= questions.length) {
      localStorage.setItem("score", globalScore);
      localStorage.setItem("numberQuestion", questionNumber);
      window.location.href = "results.html";
      return;
    }
    numberQuestion(amount);
    generateQuestion(questions);
    startTimer();
  }, 2000); // 2000ms = 2 secondi
});

//settaggio del counter question
const startTimer = () => {
  clearInterval(interval); // se c'era già un timer lo fermo
  remaining = totalTime;
  interval = setInterval(() => {
    remaining--;
    if (remaining < 0) {
      clearInterval(interval);
      remaining = 0;
      if (questionNumber < questions.length) {
        numberQuestion(amount);
      }
      // ricomincia il timer per la nuova domanda
      startTimer();
      generateQuestion(questions);
      return;
    }
    secondEl.textContent = remaining;

    // Aggiorna il gradient
    const angle = (remaining / totalTime) * 360;
    circleEl.style.background = `conic-gradient(rgba(255,255,255,0.1) 0deg ${360 - angle}deg, #00ffff ${360 - angle}deg 360deg)`;
  }, 1000);
};

//utilizzare il fetch per estrapolare le domande dall'url
// avvio del fetch per estrapolare le domande

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    questions = data.results;
    numberQuestion(amount);
    generateQuestion(data.results);
    startTimer();
  })
  .catch((error) => console.error("Errore nel fetch:", error));

//async/await
//   async function loadQuestions() {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     questions = data.results;
//     numberQuestion(amount);
//     generateQuestion(data.results);
//     startTimer();
//   } catch (error) {
//     console.error("Errore nel fetch:", error);
//   }
// }

// let difficulty = prompt("Quale difficoltà vuoi? (easy, medium, hard)");
// controllare quante domande effettivamente esistono ed impostare un limite massimo
// let amount = parseInt(prompt("Quante domande vuoi?"));
