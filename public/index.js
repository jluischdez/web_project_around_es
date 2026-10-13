var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, apiConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");
const avatarEditButton = document.querySelector(".profile__avatar-edit");
const newCardForm = document.querySelector("#new-card-form");
const editProfileForm = document.querySelector("#edit-profile-form");
const avatarForm = document.querySelector("#avatar-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const userInfo = new UserInfo({
    name: ".profile__title",
    job: ".profile__description",
    avatar: ".profile__image",
});
const imagePopup = new PopupWithImage("#image-popup");
function handleAvatarFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield api.setUserAvatar({
                avatar: formData.avatar,
            });
            userInfo.setUserInfo({
                name: user.name,
                about: user.about,
                avatar: user.avatar,
            });
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();
avatarEditButton.addEventListener("click", () => {
    avatarFormValidator.resetValidation();
    avatarPopup.open();
});
const confirmationPopup = new PopupWithConfirmation("#confirmation-popup", () => { });
let userId;
function handleImageClick(name, link) {
    imagePopup.open(link, name);
}
function handleLikeClick(cardId, isLiked) {
    return __awaiter(this, void 0, void 0, function* () {
        return api.changeLikeCardStatus(cardId, isLiked);
    });
}
function handleDeleteClick(cardId) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            confirmationPopup.setSubmitHandler(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield api.deleteCard(cardId);
                    resolve();
                }
                catch (err) {
                    console.error(err);
                    reject(err);
                }
            }));
            confirmationPopup.open();
        });
    });
}
imagePopup.setEventListeners();
confirmationPopup.setEventListeners();
const cardSection = new Section({
    items: [],
    renderer: (item) => {
        const isOwner = item.owner === userId;
        const card = new Card(item, "#card-template", handleImageClick, handleDeleteClick, isOwner, handleLikeClick);
        return card.generateCard();
    },
}, ".cards__list");
function handleCardFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cardData = {
                name: formData["place-name"],
                link: formData.link,
            };
            const cardDataFromApi = yield api.postCard(cardData);
            const isOwner = cardDataFromApi.owner === userId;
            const card = new Card(cardDataFromApi, "#card-template", handleImageClick, handleDeleteClick, isOwner, handleLikeClick);
            cardSection.addItem(card.generateCard());
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
const newCardPopup = new PopupWithForm("#new-card-popup", handleCardFormSubmit);
newCardPopup.setEventListeners();
function handleProfileFormSubmit(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield api.setUserInfo({
                name: formData.name,
                about: formData.description,
            });
            userInfo.setUserInfo({
                name: user.name,
                about: user.about,
                avatar: user.avatar,
            });
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    });
}
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
editPopup.setEventListeners();
function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    descriptionInput.value = userData.about;
}
function openEditProfilePopup() {
    fillProfileForm();
    editFormValidator.resetValidation();
    editPopup.open();
}
addButton.addEventListener("click", () => {
    newCardFormValidator.resetValidation();
    newCardPopup.open();
});
editButton.addEventListener("click", openEditProfilePopup);
const editFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
editFormValidator.enableValidation();
const newCardFormValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardFormValidator.enableValidation();
const avatarFormValidator = new FormValidator(defaultFormConfig, avatarForm);
avatarFormValidator.enableValidation();
const api = new Api(apiConfig);
function loadData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [user, cards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userId = user._id;
            userInfo.setUserInfo({
                name: user.name,
                about: user.about,
                avatar: user.avatar,
            });
            const sortedCards = [...cards].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            cardSection.setItem(sortedCards);
            cardSection.render();
        }
        catch (err) {
            console.error(err);
        }
    });
}
loadData();
