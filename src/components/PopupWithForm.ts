import { Popup } from "./Popup.js";

type FormSubmitCallback = (formData: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement;
  private _submitCallback: FormSubmitCallback;

  constructor(selector: string, submitCallback: FormSubmitCallback) {
    super(selector);

    this._formElement = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;

    this._submitCallback = submitCallback;

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

    this._formElement.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      const formData = this.getInputValues();

      this._submitCallback(formData);

      this.close();
    });
  }

  close(): void {
    super.close();

    this._formElement.reset();
  }
}

