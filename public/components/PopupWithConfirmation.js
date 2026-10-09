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
export class PopupWithConfirmation extends Popup {
    constructor(selector, handleSubmit) {
        super(selector);
        this._handleConfirmation = (event) => __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            try {
                yield this._handleSubmit();
                this.close();
            }
            catch (err) {
                console.error(err);
            }
        });
        this._handleSubmit = handleSubmit;
    }
    setSubmitHandler(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        const form = this._popupElement.querySelector(".popup__form");
        form.addEventListener("submit", this._handleConfirmation);
    }
}
