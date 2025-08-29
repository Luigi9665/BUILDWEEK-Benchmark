const checkbox = document.getElementById("promiseCheck");
const proceed = document.querySelector(".btn-welcome");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkbox.classList.add("checked-native");
    proceed.classList.add("show-visibility");
  } else {
    checkbox.classList.remove("checked-native");
    proceed.classList.remove("show-visibility");
  }
});

proceed.addEventListener("click", () => {
  if (checkbox.checked) {
    window.location.href = "question.html";
    checkbox.checked = false;
  } else {
    divWelcome.style.visibility = "hidden";
    divAlert.style.display = "block";
    trasparentDiv.style.display = "block";
  }
});

// creo il div per l'allert
const divAlert = document.createElement("div");
document.body.appendChild(divAlert);
divAlert.classList.add("alertDiv");
divAlert.innerHTML = " <strong>Promise</strong>, to <strong>Proceed!</strong> ";
const divWelcome = document.getElementById("welcome");

// creo il div per il bg trasparente

const trasparentDiv = document.createElement("div");
document.body.appendChild(trasparentDiv);
trasparentDiv.classList.add("ghostDiv");

trasparentDiv.addEventListener("click", () => {
  divWelcome.style.visibility = "visible";
  divAlert.style.display = "none";
  trasparentDiv.style.display = "none";
});
