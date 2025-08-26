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

const numberQuestion = (amount) => {
  const spanQuantity = document.getElementById("quantity-question");
  spanQuantity.innerText = `/${amount}`;
  const spanQuestion = document.getElementById("counter-answer");
  spanQuestion.innerText = `${questionNumber + 1}`;
};

const generateQuestion = (data) => {
  divQuestion.querySelector("h1").innerText = data[questionNumber].question;
};

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
