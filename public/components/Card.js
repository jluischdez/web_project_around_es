var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Card {
    constructor(data, templateSelector, handleCardClick, handleDeleteClick, isOwner, handleLikeClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._isOwner = isOwner;
        this._handleLikeClick = handleLikeClick;
    }
    getTemplate() {
        const template = document.querySelector(this._templateSelector);
        return template.content
            .querySelector(".card")
            .cloneNode(true);
    }
    generateCard() {
        this._element = this.getTemplate();
        const cardImage = this._element.querySelector(".card__image");
        const cardTitle = this._element.querySelector(".card__title");
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        this.setEventListeners();
        return this._element;
    }
    setEventListeners() {
        const likeButton = this._element.querySelector(".card__like-button");
        const deleteButton = this._element.querySelector(".card__delete-button");
        const cardImage = this._element.querySelector(".card__image");
        likeButton.classList.toggle("card__like-button_is-active", this._data.isLiked);
        likeButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCard = yield this._handleLikeClick(this._data._id, this._data.isLiked);
                this._data = updatedCard;
                likeButton.classList.toggle("card__like-button_is-active", this._data.isLiked);
            }
            catch (err) {
                console.error(err);
            }
        }));
        if (!this._isOwner) {
            deleteButton.remove();
        }
        else {
            deleteButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield this._handleDeleteClick(this._data._id);
                    this._element.remove();
                }
                catch (err) {
                    console.error(err);
                }
            }));
        }
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }
}
