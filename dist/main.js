const APP = {
  init() {
    const form = document.getElementById("form");
    const firstName = document.getElementById("firstNameInput");
    const lastName = document.getElementById("lastNameInput");
    const email = document.getElementById("email");
    const adress = document.getElementById("adress");
    const zip = document.getElementById("zipCode");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    form.addEventListener("submit", APP.validate);
    firstName.addEventListener("change", APP.testName);
    lastName.addEventListener("change", APP.testName);
    email.addEventListener("change", APP.testEmail);
    adress.addEventListener("change", APP.testAdress);
    zip.addEventListener("change", APP.testZIP);
    password.addEventListener("change", APP.testPassword);
    confirmPassword.addEventListener("change", APP.testConfirmPassword);

    email.addEventListener("invalid", APP.showError);
    firstName.addEventListener("invalid", APP.showError);
    lastName.addEventListener("invalid", APP.showError);
    adress.addEventListener("invalid", APP.showError);
    zip.addEventListener("invalid", APP.showError);
    password.addEventListener("invalid", APP.showError);
    confirmPassword.addEventListener("invalid", APP.showError);
  },
  validate(e) {
    e.preventDefault();
    if (e.target.checkValidity()) {
      const sucessMessage = document.createElement("span");
      sucessMessage.textContent = "You did IT! The Form is valid :)";
      document.querySelector(".buttonDiv").appendChild(sucessMessage);
    }
  },
  testName(e) {
    let name = e.target;
    APP.resetErrorMessage(name);
    name.setCustomValidity("");

    if (name.checkValidity()) {
      let regEx = /^[a-zA-Z ]{2,30}$/;
      if (regEx.test(name.value) == false) {
        name.setCustomValidity("Fill in a correct Name");
        name.reportValidity();
      }
    }
  },
  testEmail(e) {
    let email = e.target;
    APP.resetErrorMessage(email);
    email.setCustomValidity("");

    if (email.checkValidity()) {
      const emReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emReg.test(email.value) == false) {
        email.setCustomValidity("Please fill in a correct Email Adress");
        email.reportValidity();
      }
    } else {
      email.setCustomValidity("Please fill in a correct Email Adress");
      email.reportValidity();
    }
  },
  testAdress(e) {
    const adress = e.target;
    APP.resetErrorMessage(adress);
    adress.setCustomValidity("");

    if (adress.checkValidity() == false) {
      adress.setCustomValidity("Fill in an adress");
      adress.reportValidity();
    }
  },
  testZIP(e) {
    const zip = e.target;
    APP.resetErrorMessage(zip);
    zip.setCustomValidity("");

    if (zip.checkValidity()) {
      const regEx = /^\d{5}$|^\d{5}-\d{4}$/;
      if (regEx.test(zip.value) == false) {
        zip.setCustomValidity("Put in a correct ZIP Code");
        zip.reportValidity();
      }
    }
  },
  testPassword(e) {
    const password = e.target;
    APP.resetErrorMessage(password);
    password.setCustomValidity("");

    if (password.checkValidity()) {
      const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/;
      if (regExp.test(password.value) == false) {
        password.setCustomValidity("Password is not secure");
        password.reportValidity();
      }
    }
  },
  testConfirmPassword(e) {
    const confirmation = e.target;
    APP.resetErrorMessage(confirmation);
    confirmation.setCustomValidity("");

    if (confirmation.checkValidity()) {
      const password = document.getElementById("password");
      if (password.value !== confirmation.value) {
        confirmation.setCustomValidity("Passwords are not the same");
        confirmation.reportValidity();
        console.log(password.value, confirmation.value);
      }
    }
  },
  showError(e) {
    let input = e.target;
    input.classList.add("invalidInput");
    const span = input.parentElement.querySelector(".errorMessage");

    switch (input.id) {
      case "email":
        span.textContent = "Fill in a valid Email Adress";
        break;
      case "firstNameInput":
        span.textContent = "Fill in a real Name";
        break;
      case "lastNameInput":
        span.textContent = "Fill in a real Name";
        break;
      case "adress":
        span.textContent = "Fill in an adress";
        break;
      case "zip":
        span.textContent = "Fill in a correct ZIP Code";
        break;
      case "password":
        span.textContent =
          "Password should contain at least 6 characters, 1 lower- and uppercase letter and 1 number ";
        break;
      case "confirmPassword":
        span.textContent = "Passwords are not the same";
        break;
    }
  },
  resetErrorMessage(input) {
    input.classList.remove("invalidInput");
    input.parentElement.querySelector(".errorMessage").textContent = "";
  },
};

document.addEventListener("DOMContentLoaded", APP.init());
