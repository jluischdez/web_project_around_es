export class FormValidator {
    constructor(config, forElement) {
        this.config = config;
        this.formElement = forElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.submitButton = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    checkInputValidity(input) {
        return input.validity.valid;
    }
    toggleButtonState() {
        const isFormValid = this.inputList.every((input) => this.checkInputValidity(input));
        this.submitButton.disabled = !isFormValid;
        this.submitButton.classList.toggle(this.config.inactiveButtonClass, !isFormValid);
    }
    showInputError(input) {
        input.classList.add(this.config.inputErrorClass);
        const errorElement = input.nextElementSibling;
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(input) {
        input.classList.remove(this.config.inputErrorClass);
        const errorElement = input.nextElementSibling;
        errorElement.classList.remove(this.config.errorClass);
    }
    isValid(input) {
        if (this.checkInputValidity(input)) {
            this.hideInputError(input);
        }
        else {
            this.showInputError(input);
        }
    }
    setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((input) => {
            input.addEventListener("input", (evt) => {
                this.isValid(input);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        this.inputList.forEach((input) => {
            this.hideInputError(input);
        });
        this.toggleButtonState();
    }
}
