import { Popup } from "./Popup.js";

type FormSubmitCallback = (formData: Record<string, string>) => void | Promise<void>;

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement;
  private _submitCallback: FormSubmitCallback;
  private _submitButton: HTMLButtonElement;
  private _submitButtonText: string;

  constructor(selector: string, submitCallback: FormSubmitCallback) {
    super(selector);

    this._formElement = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;
    this._submitButton = this._formElement.querySelector(
  ".popup__button"
) as HTMLButtonElement;

    this._submitCallback = submitCallback;
    this._submitButtonText = this._submitButton.textContent || "";

  }

  private getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    const formData = new FormData(this._formElement);

    formData.forEach((value, key) => {
      inputValues[key] = value.toString();
    });

    return inputValues;
  }

  setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener("submit", async (event: SubmitEvent) => {
      event.preventDefault();

      const formData = this.getInputValues();

      this._submitButton.textContent = "Guardando...";

try {
  await this._submitCallback(formData);
  this.close();
} catch (err) {
  console.error(err);
} finally {
  this._submitButton.textContent = this._submitButtonText;
}
    });
  }

  close(): void {
    super.close();

    this._formElement.reset();
  }
}

