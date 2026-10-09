var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(selector, submitCallback) {
        super(selector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._formElement.querySelector(".popup__button");
        this._submitCallback = submitCallback;
        this._submitButtonText = this._submitButton.textContent || "";
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
        const _super = Object.create(null, {
            setEventListeners: { get: () => super.setEventListeners }
        });
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = this.getInputValues();
            this._submitButton.textContent = "Guardando...";
            try {
                yield this._submitCallback(formData);
                this.close();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                this._submitButton.textContent = this._submitButtonText;
            }
        }));
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
