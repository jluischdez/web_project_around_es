import {
  checkFormValidity,
  checkCardFormValidity,
  resetValidation,
} from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = document.querySelector("#new-card-form");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");

const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const cardSubmitButton = newCardForm.querySelector(".popup__button");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
const formElement = document.querySelector("#edit-profile-form");

const nameError = nameInput.nextElementSibling;
const descriptionError = descriptionInput.nextElementSibling;

function getCardElement({
  name = "Sin título",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", handleDeleteButton);
  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  return cardElement;
}

function handleLikeButton(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButton(evt) {
  evt.target.closest(".card").remove();
}

function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

function renderCard(card) {
  const cardElement = getCardElement(card);
  cardsContainer.prepend(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  renderCard(cardData);

  closeModal(newCardPopup);
  newCardForm.reset();
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  resetValidation(formElement, submitButton);
  fillProfileForm();
  handleProfileFormInput();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
  resetValidation(formElement, submitButton);
}

initialCards.forEach((card) => {
  renderCard(card);
});

const submitButton = formElement.querySelector(".popup__button");

checkCardFormValidity(cardNameInput, cardLinkInput, cardSubmitButton);

function setEventListeners() {
  addButton.addEventListener("click", () => {
    openModal(newCardPopup);
  });

  newCardCloseButton.addEventListener("click", () => {
    closeModal(newCardPopup);
    newCardForm.reset();
  });

  closeButton.addEventListener("click", () => {
    closeModal(editPopup);
    resetValidation(formElement, submitButton);
  });

  imagePopupCloseButton.addEventListener("click", () => {
    closeModal(imagePopup);
  });

  newCardForm.addEventListener("submit", handleCardFormSubmit);
  editButton.addEventListener("click", handleOpenEditModal);
  formElement.addEventListener("submit", handleProfileFormSubmit);

  cardNameInput.addEventListener("input", handleCardFormInput);
  cardLinkInput.addEventListener("input", handleCardFormInput);

  nameInput.addEventListener("input", handleProfileFormInput);
  descriptionInput.addEventListener("input", handleProfileFormInput);

  imagePopup.addEventListener("click", (evt) => {
    if (evt.target === imagePopup) {
      closeModal(imagePopup);
    }
  });

  editPopup.addEventListener("click", (evt) => {
    if (evt.target === editPopup) {
      closeModal(editPopup);
      resetValidation(formElement, submitButton);
    }
  });

  newCardPopup.addEventListener("click", (evt) => {
    if (evt.target === newCardPopup) {
      closeModal(newCardPopup);
      newCardForm.reset();
    }
  });
}
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      if (openedPopup === editPopup) {
        resetValidation(formElement, submitButton);
      }
      if (openedPopup === newCardPopup) {
        newCardForm.reset();
      }
      closeModal(openedPopup);
    }
  }
}

function handleCardFormInput() {
  checkCardFormValidity(cardNameInput, cardLinkInput, cardSubmitButton);
}

function handleProfileFormInput() {
  checkFormValidity(
    nameInput,
    descriptionInput,
    submitButton,
    nameError,
    descriptionError,
  );
}

setEventListeners();
