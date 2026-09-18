interface CardData {
  name: string;
  link: string;
}

export class Card {
    private _data: CardData;
    private _templateSelector: string;
    private _handleCardClick: (name: string, link: string) => void;
    private _element!: HTMLElement;

constructor (
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
}

private getTemplate(): HTMLElement {
  const template = document.querySelector(
    this._templateSelector
  ) as HTMLTemplateElement;

  return template.content
    .querySelector(".card")!
    .cloneNode(true) as HTMLElement;
}

public generateCard(): HTMLElement {
  this._element = this.getTemplate();

  const cardImage = this._element.querySelector(".card__image") as HTMLImageElement;
  const cardTitle = this._element.querySelector(".card__title") as HTMLElement;

  cardTitle.textContent = this._data.name;
  (cardImage as HTMLImageElement).src = this._data.link;
  (cardImage as HTMLImageElement).alt = this._data.name;

  this.setEventListeners();

  return this._element;
}

private setEventListeners(): void {
  const likeButton = this._element.querySelector(
    ".card__like-button"
  ) as HTMLElement;

  const deleteButton = this._element.querySelector(
    ".card__delete-button"
  ) as HTMLElement;

  const cardImage = this._element.querySelector(
    ".card__image"
  ) as HTMLImageElement;

  likeButton.addEventListener("click", (evt: Event) => {
    (evt.target as HTMLElement).classList.toggle(
      "card__like-button_is-active"
    );
  });

deleteButton.addEventListener("click", (evt: Event) => {
  (evt.target as HTMLElement).closest(".card")?.remove();
});

cardImage.addEventListener("click", () => {
    this._handleCardClick(this._data.name, this._data.link);
});

}

}

