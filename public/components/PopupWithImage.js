import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._captionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(imageLink = "", imageCaption = "") {
        this._imageElement.src = imageLink;
        this._imageElement.alt = imageCaption;
        this._captionElement.textContent = imageCaption;
        super.open();
    }
}
