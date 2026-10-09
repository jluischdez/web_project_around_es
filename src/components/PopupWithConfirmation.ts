import { Popup } from "./Popup.js";

type SubmitHandler = () => void | Promise<void>;

export class PopupWithConfirmation extends Popup {
  private _handleSubmit: SubmitHandler;

  constructor(selector: string, handleSubmit: SubmitHandler) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }

  public setSubmitHandler(handleSubmit: SubmitHandler): void {
    this._handleSubmit = handleSubmit;
  }

  private _handleConfirmation = async (event: Event): Promise<void> => {
    event.preventDefault();

    try {
      await this._handleSubmit();
      this.close();
    } catch (err) {
      console.error(err);
    }
  };

  public setEventListeners(): void {
    super.setEventListeners();

    const form = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;

    form.addEventListener("submit", this._handleConfirmation);
  }
}