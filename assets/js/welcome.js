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
    alert("Non hai accettato i termini!");
  }
});
