import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    private _imageElement: HTMLImageElement;
    private _captionElement: HTMLElement;

    constructor (selector: string) {
        super(selector);

        this._imageElement = this._popupElement.querySelector(
            ".popup__image"
        ) as HTMLImageElement;
        this._captionElement = this._popupElement.querySelector(
            ".popup__caption"
        ) as HTMLElement;

    }

    open(imageLink: string = "", imageCaption: string = ""): void {
        this._imageElement.src = imageLink;
        this._imageElement.alt = imageCaption;
        this._captionElement.textContent = imageCaption;

        super.open();
    }

}