/* Variables */
const rating = document.querySelector(".rating");

const comment = document.getElementById("comment");
const submitBtn = document.getElementById("submit");
const commentsList = document.getElementById("comments-list");

const feedbackBtn = document.querySelector(".btn-general");
const starColor = document.querySelectorAll(".star");
feedbackBtn.classList.add("no-before");

//dichiarare una variabile per gestire il data value della stella selezionata
let starSelected = 0;
// gestione del passaggio del mouse sulle stelle con mouseover e mouseout
starColor.forEach((star) => {
  // si accendono al passaggio del mouse
  star.addEventListener("mouseover", (event) => {
    lumos(event.target.getAttribute("data-value"));
  });
  // si spengono rimuovendo il puntatore del mouse
  star.addEventListener("mouseout", () => {
    lumos(starSelected);
  });
});

/* Rating system */
rating.addEventListener("click", (event) => {
  if (event.target.classList.contains("star")) {
    starSelected = parseInt(event.target.dataset.value);
    lumos(starSelected);
  }
});

//creare una funzione indipendente per illuminiare e spegnere le stelle
const lumos = (value) => {
  starColor.forEach((star) => {
    if (parseInt(star.dataset.value) <= value) {
      star.classList.add("star-color");
    } else {
      star.classList.remove("star-color");
    }
  });
};

/* Input */
comment.addEventListener("input", () => {
  if (comment.value.trim() === "") {
    feedbackBtn.classList.add("no-before");
  } else {
    feedbackBtn.classList.remove("no-before");
  }
});

/* Submit Button */
submitBtn.addEventListener("click", () => {
  if (comment.value.trim() !== "") {
    const newListItem = document.createElement("li");
    commentsList.appendChild(newListItem);
    newListItem.innerHTML = comment.value;
    comment.value = "";
    feedbackBtn.classList.add("no-before");
    const starOver = document.querySelectorAll(".star-color");
    starOver.forEach((star) => {
      star.classList.remove("star-color");
    });
  }
});
