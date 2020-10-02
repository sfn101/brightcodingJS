const namePattern = /^[a-zA-Z0-9]{5,12}$/;

const form = document.querySelector(".my-form");

const feedback = document.querySelector(".feedback");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (namePattern.test(form.username.value)) {
    form.username.removeAttribute("class", "error");
    feedback.textContent = "valid username";
  } else {
    form.username.setAttribute("class", "error");
    feedback.textContent = `Username most have
       5 to 12 characters
       only letters and numbers
       A-Z 0-9`;
  }
});
