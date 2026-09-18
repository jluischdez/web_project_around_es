import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitCallback = submitCallback;
    }
    getInputValues() {
        const inputValues = {};
        const formData = new FormData(this._formElement);
        formData.forEach((value, key) => {
            inputValues[key] = value.toString();
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = this.getInputValues();
            this._submitCallback(formData);
            this.close();
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
