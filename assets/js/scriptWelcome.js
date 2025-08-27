const checkbox = document.getElementById("promiseCheck");
console.log(checkbox);

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkbox.classList.add("checked-native");
  } else checkbox.classList.remove("checked-native");
});

const proceed = document.querySelector(".btn-general");

proceed.addEventListener("click", () => {
  if (checkbox.checked) {
    window.location.href = "question.html";
    checkbox.checked = false;
  } else {
    alert("Non hai accettato i termini!");
  }
});
