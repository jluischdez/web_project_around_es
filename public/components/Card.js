export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        likeButton.addEventListener("click", (evt) => {
            evt.target.classList.toggle("card__like-button_is-active");
        });
        deleteButton.addEventListener("click", (evt) => {
            var _a;
            (_a = evt.target.closest(".card")) === null || _a === void 0 ? void 0 : _a.remove();
        });
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }
}
