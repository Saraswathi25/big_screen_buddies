const form = document.getElementById("register_form");
const firstNameEL = document.getElementById("firstName");
const lastNameEL = document.getElementById("lastName");
const usernameEL = document.getElementById("username");
const passwordEL = document.getElementById("password");
const emailEL = document.getElementById("email");
const phoneNumberEL = document.getElementById("phoneNumber");

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
  const firstNameValue = firstNameEL.value.trim();
  const lastNameValue = lastNameEL.value.trim();
  const usernameValue = usernameEL.value.trim();
  const passwordValue = passwordEL.value.trim();
  const emailValue = emailEL.value.trim();
  const phoneNumberValue = phoneNumberEL.value.trim();

  if (usernameValue === "") {
    setError(usernameEL, "Username must be provided");
  } else {
    setSuccess(usernameEL);
  }

  if (emailValue === "") {
    setError(emailEL, "Email must be provided");
  } else if (!isValidEmail(emailValue)) {
    setError(emailEL, "Please enter a valid email address");
  } else {
    setSuccess(emailEL);
  }

  if (passwordValue === "") {
    setError(passwordEL, "Password must be provided");
  } else if (passwordValue.length < 8) {
    setError(passwordEL, "Password must be at least 8 characters long");
  } else {
    setSuccess(passwordEL);
  }

  if (firstNameValue === "") {
    setError(firstNameEL, "First name must be provided");
  } else {
    setSuccess(firstNameEL);
  }
  if (lastNameValue === "") {
    setError(lastNameEL, "Last name must be provided");
  } else {
    setSuccess(lastNameEL);
  }
  if (phoneNumberValue === "") {
    setError(phoneNumberEL, "Phone number must be provided");
  } else {
    setSuccess(phoneNumberEL);
  }
};
