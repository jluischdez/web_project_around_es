export class Popup {
    constructor(selector) {
        this.handleEscClose = (event) => {
            if (event.key === "Escape") {
                this.close();
            }
        };
        this._popupElement = document.querySelector(selector);
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    setEventListeners() {
        this._popupElement.addEventListener("click", (event) => {
            if (event.target === event.currentTarget ||
                event.target.classList.contains("popup__close")) {
                this.close();
            }
        });
    }
}
