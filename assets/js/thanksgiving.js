//  classe h1 .primary-text-box-title
// riprendere la prima descrizione #firstDescription
// riprendere la seconda descrizione #secondDescription
//  ul id #comments-list

const h1 = document.querySelector(".primary-text-box-title");
h1.innerText = "Thanks for your feedback!";

const firstDesc = document.querySelector("#firstDescription");
const secondDesc = document.querySelector("#secondDescription");
const ul = document.querySelector("#comments-list");
const comment = localStorage.getItem("comment");
const starValue = localStorage.getItem("starValue");
const starColor = document.querySelectorAll(".star");
const li = document.createElement("li");

// padding: 2rem;
//     width: 70%;

const divfeedback = document.querySelector(".feedback-box");
divfeedback.style.padding = "2rem";
divfeedback.style.width = "65%";

// illumino le stelle
const lumos = (value, comment) => {
  starColor.forEach((star) => {
    if (parseInt(star.dataset.value) <= value) {
      star.classList.add("star-color");
    } else {
      star.classList.remove("star-color");
    }
    li.innerText = comment;
    ul.appendChild(li);
  });
};

// i valori passati dalla pagina JS del feedback

const generationFirstDescription = (value) => {
  if (value <= 4) {
    firstDesc.innerText = "We're sorry for your experience. We'll work to improve.";
  } else if (value > 4 && value <= 6) {
    firstDesc.innerText = "We value your opinion. We'll keep getting better.";
  } else if (value > 6 && value < 9) {
    firstDesc.innerText = "We're glad you had a good experience. Thanks for your support!";
  } else if (value >= 9) {
    firstDesc.innerText = "Fantastic! Your high rating motivates us to maintain excellence!";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  lumos(starValue, comment);
  generationFirstDescription(starValue);
});
