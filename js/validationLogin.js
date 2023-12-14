const form = document.getElementById("login_form");
const passwordEl = document.getElementById("password");
const emailEL = document.getElementById("email");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const emailValue = emailEL.value;
  const passwordValue = passwordEl.value.trim();

  if (emailValue === "") {
    setError(emailEL, "Username must be provided");
  } else {
    setSuccess(emailEL);
  }

  if (passwordValue === "") {
    setError(passwordEl, "Password must be provided");
  } else if (passwordValue.length < 8) {
    setError(passwordEl, "Password must be at least 8 characters long");
  } else {
    setSuccess(passwordEl);
  }
};
