export class Popup {
  protected _popupElement: HTMLElement;

  constructor(selector: string) {
    this._popupElement = document.querySelector(selector) as HTMLElement;
  }

open(): void {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
}

close(): void {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
}

private handleEscClose = (event: KeyboardEvent): void  => {
if(event.key === "Escape") {
    this.close();
}
};

setEventListeners(): void {
    this._popupElement.addEventListener("click", (event: MouseEvent) => {
        if (
            event.target === event.currentTarget || 
            (event.target as HTMLElement).classList.contains("popup__close")
        ) {
            this.close();
        }
    });
}
}