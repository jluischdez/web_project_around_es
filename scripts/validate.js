export function checkFormValidity(
  nameInput,
  descriptionInput,
  submitButton,
  nameError,
  descriptionError,
) {
  const isFormValid =
    checkinputValidity(nameInput) && checkinputValidity(descriptionInput);
  submitButton.disabled = !isFormValid;
  nameError.textContent = nameInput.validationMessage;
  descriptionError.textContent = descriptionInput.validationMessage;
}

export function checkCardFormValidity(
  cardNameInput,
  cardLinkInput,
  cardSubmitButton,
) {
  const isCardFormValid =
    checkinputValidity(cardNameInput) && checkinputValidity(cardLinkInput);
  cardSubmitButton.disabled = !isCardFormValid;
}

export function checkinputValidity(input) {
  return input.validity.valid;
}

export function resetValidation(form, submitButton) {
  form.reset();
  submitButton.disabled = true;

  const errorElements = form.querySelectorAll(".popup__error");
  errorElements.forEach((errorElement) => {
    errorElement.textContent = "";
  });
}
