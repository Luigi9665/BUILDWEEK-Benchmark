let globalScore = 0;
let questionNumber = 0;
// let difficulty = prompt("Quale difficoltà vuoi? (easy, medium, hard)");
// controllare quante domande effettivamente esistono ed impostare un limite massimo
// let amount = parseInt(prompt("Quante domande vuoi?"));
let difficulty = "easy";
let amount = 2;
let category = 18; // computer science / coding
let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
const divQuestion = document.querySelector(".question");
let totalTime = 30; // secondi totali
let remaining = totalTime; //secondi che dovranno diminuire
const secondEl = document.querySelector(".second");
const circleEl = document.getElementById("timer");

//settaggio footer per numero totale delle domande e numero della domanda in esecuzione
const numberQuestion = (amount) => {
  const spanQuantity = document.getElementById("quantity-question");
  spanQuantity.innerText = `/${amount}`;
  const spanQuestion = document.getElementById("counter-answer");
  spanQuestion.innerText = `${questionNumber + 1}`;
};

//generazione della domanda
const generateQuestion = (data) => {
  divQuestion.querySelector("h1").innerHTML = data[questionNumber].question;
  const button = divQuestion.querySelectorAll(".answer");
};

//settaggio del counter domanda
const interval = setInterval(() => {
  remaining--;
  if (remaining < 0) {
    clearInterval(interval);
    remaining = 0;
  }
  secondEl.textContent = remaining;
  // Aggiorna il gradient
  const angle = (remaining / totalTime) * 360;
  circleEl.style.background = `conic-gradient(rgba(255,255,255,0.1) 0deg ${360 - angle}deg, #00ffff ${360 - angle}deg 360deg)`;
}, 1000);

//utilizzare il fetch per estrapolare le domande dall'url
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    // array di domande
    // qui puoi usare data.results per costruire il questionario
    numberQuestion(amount);
    generateQuestion(data.results);
  })
  .catch((error) => console.error("Errore nel fetch:", error));
