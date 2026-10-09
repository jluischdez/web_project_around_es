import { CardData } from "../utils/types.js";


export class Card {
    private _data: CardData;
    private _templateSelector: string;
    private _handleCardClick: (name: string, link: string) => void;
    private _element!: HTMLElement;
    private _handleDeleteClick: (cardId: string) => Promise<void>;
    private _isOwner: boolean;
    private _handleLikeClick: (
  cardId: string,
  isLiked: boolean
) => Promise<CardData>;

constructor (
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: (cardId: string) => Promise<void>,
    isOwner: boolean,
    handleLikeClick: (
  cardId: string,
  isLiked: boolean
) => Promise<CardData>,
) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._isOwner = isOwner;
    this._handleLikeClick = handleLikeClick;
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

  likeButton.classList.toggle(
  "card__like-button_is-active",
  this._data.isLiked
);

  likeButton.addEventListener("click", async () => {
  try {
    const updatedCard = await this._handleLikeClick(
      this._data._id,
      this._data.isLiked
    );

    this._data = updatedCard;

    likeButton.classList.toggle(
      "card__like-button_is-active",
      this._data.isLiked
    );
  } catch (err) {
    console.error(err);
  }
});

if (!this._isOwner) {
  deleteButton.remove();
} else {
  deleteButton.addEventListener("click", async () => {
    try {
      await this._handleDeleteClick(this._data._id);
      this._element.remove();
    } catch (err) {
      console.error(err);
    }
  });
}

cardImage.addEventListener("click", () => {
    this._handleCardClick(this._data.name, this._data.link);
});

}

}

