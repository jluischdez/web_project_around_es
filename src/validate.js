export function checkInputValidity(input) {
  return input.validity.valid;
}

export function checkFormValidity(inputList, buttonElement) {
  const isFormValid = inputList.every((input) => checkInputValidity(input));
  inputList.forEach((input) => {
    const errorElement = input.nextElementSibling;
    if (errorElement) {
      errorElement.textContent = input.validationMessage;
    }
  });
  buttonElement.disabled = !isFormValid;
}

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll("input"));
  const buttonElement = formElement.querySelector(".popup__button");

  checkFormValidity(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkFormValidity(inputList, buttonElement);
    });
  });
}

export function resetValidation(form, submitButton) {
  form.reset();
  submitButton.disabled = true;

  const errorElements = form.querySelectorAll(".popup__error");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
  });
}
