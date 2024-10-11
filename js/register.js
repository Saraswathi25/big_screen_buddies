const create_accountEL = document.querySelector(".create-account");

form.addEventListener("submit", (e) => {
  const errorInputs = document.querySelectorAll(".input-wrapper.error");

  e.preventDefault();
  if (errorInputs.length === 0) {
    let firstName = firstNameEL.value;
    let lastName = lastNameEL.value;
    let username = usernameEL.value;
    let password = passwordEL.value;
    let email = emailEL.value;
    

    const userInformation = {
      firstName,
      lastName,
      username,
      password,
      email,
      
    };

    window.localStorage.setItem("userInfo", JSON.stringify(userInformation));

    location.replace("login.html");
  }
});

create_accountEL.addEventListener("click", () => {
  location.replace("login.html");
});
