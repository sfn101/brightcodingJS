const form = document.querySelector(".my-form");
form.addEventListener("submit", e => {
  e.preventDefault();
});

const namePattern = /^[a-zA-Z0-9]${5, 12}/;

form.username.addEventListener("keyup", e => {
  if (namePattern) {
    console.log("submit is successful");
  } else {
    form.username.setAttribute("class", "error");
  }
});
