const createAccountEl = document.querySelector(".create-account");

const serialize = function (obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
  const errorInputs = document.querySelectorAll(".input-wrapper.error");
  const urlParams = new URLSearchParams(window.location.search);
  const time = urlParams.get("time");
  
  const emailErrorDiv = document.querySelector("#email ~ .error");
  const passwordErrorDiv = document.querySelector("#password ~ .error");
  
  if (errorInputs.length === 0) {
    let emailValue = emailEL.value;
    let passwordValue = passwordEl.value.trim();
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    
    if (userInfo == null) {
      // Show error below email input field
      emailErrorDiv.textContent = "Email does not exist. Please enter a valid email.";
      emailErrorDiv.style.display = "block";
      return;
    }

    const checkPass = userInfo.password === passwordValue;
    
    if (userInfo !== null && checkPass && time) {
      localStorage.setItem("isLoggedIn", true);
      location.replace(`seat_selection.html?time=` + time);
    } else if (userInfo !== null && checkPass) {
      localStorage.setItem("isLoggedIn", true);
      location.replace(`index.html?${serialize(userInfo)}`);
    } else {
      // Show error below password input field
      passwordErrorDiv.textContent = "Password is incorrect. Please try again.";
      passwordErrorDiv.style.display = "block";
      return;
    }
  }
});

createAccountEl.addEventListener("click", () => {
  location.replace("register.html");
});
