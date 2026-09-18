import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig } from "./utils/constants.js";

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



const addButton = document.querySelector(
  ".profile__add-button"
) as HTMLButtonElement;

const editButton = document.querySelector(
  ".profile__edit-button"
) as HTMLButtonElement;

const newCardForm = document.querySelector(
  "#new-card-form"
) as HTMLFormElement;

const formElement = document.querySelector(
  "#edit-profile-form"
) as HTMLFormElement;

const nameInput = document.querySelector(
  ".popup__input_type_name"
) as HTMLInputElement;

const descriptionInput = document.querySelector(
  ".popup__input_type_description"
) as HTMLInputElement;

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__description",
});



const imagePopup = new PopupWithImage("#image-popup");

function handleImageClick(name: string, link: string): void {
  imagePopup.open(link, name);
}

imagePopup.setEventListeners();



const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleImageClick
      );

      return card.generateCard();
    },
  },
  ".cards__list"
);



function handleCardFormSubmit(
  formData: Record<string, string>
): void {
  const cardData = {
    name: formData["place-name"],
    link: formData.link,
  };

  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick
  );

  cardSection.addItem(card.generateCard());
}

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit
);

newCardPopup.setEventListeners();



function handleProfileFormSubmit(
  formData: Record<string, string>
): void {
  userInfo.setUserInfo ({
  name: formData.name,
  job: formData.description,
});
  editFormValidator.resetValidation();
}

const editPopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);

editPopup.setEventListeners();



function fillProfileForm(): void {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  descriptionInput.value = userData.job;
}

function handleOpenEditModal(): void {
  fillProfileForm();

  editFormValidator.resetValidation();

  editPopup.open();
}



addButton.addEventListener("click", () => {
  newCardPopup.open();
});

editButton.addEventListener("click", handleOpenEditModal);



cardSection.render();



const editFormValidator = new FormValidator(
  defaultFormConfig,
  formElement
);

editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  defaultFormConfig,
  newCardForm
);

newCardFormValidator.enableValidation();