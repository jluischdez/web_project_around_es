
interface FormValidatorConfig {
    inputSelector: string;
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}

export class FormValidator{
    private config: FormValidatorConfig;
    private formElement: HTMLFormElement;
    private inputList: HTMLInputElement[];
    private submitButton: HTMLButtonElement;

    constructor(config: FormValidatorConfig, forElement: HTMLFormElement) {
    this.config = config;
    this.formElement = forElement;
    this.inputList = Array.from(
        this.formElement.querySelectorAll(this.config.inputSelector)
    );
    this.submitButton = this.formElement.querySelector(
        this.config.submitButtonSelector
    ) as HTMLButtonElement;
    }

    private checkInputValidity(input: HTMLInputElement): boolean{
        return input.validity.valid;
    }

    private toggleButtonState(): void {
        const isFormValid = this.inputList.every(
            (input) => this.checkInputValidity(input)
        );
        this.submitButton.disabled = !isFormValid;
        this.submitButton.classList.toggle(
            this.config.inactiveButtonClass, !isFormValid
        );
    }
    private showInputError(input: HTMLInputElement): void{
        input.classList.add(this.config.inputErrorClass);
        const errorElement = input.nextElementSibling as HTMLElement;
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    
    private hideInputError(input: HTMLInputElement): void {
        input.classList.remove(this.config.inputErrorClass);
        const errorElement = input.nextElementSibling as HTMLElement;
        errorElement.classList.remove(this.config.errorClass);
    }

private isValid(input: HTMLInputElement): void {
    if (this.checkInputValidity(input)) {
        this.hideInputError(input);
       } else {
            this.showInputError(input);
        }

    }

 private setEventListeners (): void {
this.toggleButtonState ();
this.inputList.forEach((input) => {
    input.addEventListener("input", (evt: Event) => {
        this.isValid(input);
        this.toggleButtonState();
     });
    });
 }   

 public enableValidation(): void {   
    this.setEventListeners();
 }

 public resetValidation(): void {
    this.inputList.forEach((input) => {
        this.hideInputError(input);
    });
    this.toggleButtonState();
 }
}

 

