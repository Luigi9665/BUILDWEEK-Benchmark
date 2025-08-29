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
    divSection.style.visibility = "hidden";
    divAlert.style.display = "block";
    trasparentDiv.style.display = "block";
  }
});

// creo il div per l'allert
const divAlert = document.createElement("div");
document.body.appendChild(divAlert);
divAlert.classList.add("alertDiv");
divAlert.innerHTML = " <strong>Attention! click on</strong><br><strong>Promise</strong>, to <strong>Proceed!</strong> ";
const divWelcome = document.getElementById("welcome");
const divSection = document.querySelector(".sectionSet");

// creo il div per il bg trasparente

const trasparentDiv = document.createElement("div");
document.body.appendChild(trasparentDiv);
trasparentDiv.classList.add("ghostDiv");

trasparentDiv.addEventListener("click", () => {
  divAlert.style.display = "none";
  divWelcome.style.visibility = "visible";
  divSection.style.visibility = "visible";
  trasparentDiv.style.display = "none";
});

// costruzione e inserimento button chiusura

const closeButton = document.createElement("button");
closeButton.innerHTML = "×";
closeButton.className = "closeBtn";
closeButton.onclick = function () {
  divWelcome.style.visibility = "visible";
  divSection.style.visibility = "visible";
  divAlert.style.display = "none";
  trasparentDiv.style.display = "none";
};
divAlert.appendChild(closeButton);
