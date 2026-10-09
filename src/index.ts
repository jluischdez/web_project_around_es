import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, apiConfig } from "./utils/constants.js";
import { Api } from "./components/Api.js";
import { CardData } from "./utils/types.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";


const addButton = document.querySelector(
  ".profile__add-button"
) as HTMLButtonElement;

const editButton = document.querySelector(
  ".profile__edit-button"
) as HTMLButtonElement;

const avatarEditButton = document.querySelector(
  ".profile__avatar-edit"
) as HTMLButtonElement;

const newCardForm = document.querySelector(
  "#new-card-form"
) as HTMLFormElement;

const editProfileForm = document.querySelector(
  "#edit-profile-form"
) as HTMLFormElement;

const avatarForm = document.querySelector(
  "#avatar-form"
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
  avatar: ".profile__image",
});

const imagePopup = new PopupWithImage("#image-popup");

async function handleAvatarFormSubmit(
  formData: Record<string, string>
): Promise<void> {
  try {
    const user = await api.setUserAvatar({
      avatar: formData.avatar,
    });

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const avatarPopup = new PopupWithForm(
  "#avatar-popup",
  handleAvatarFormSubmit
);

avatarPopup.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarPopup.open();
});

const confirmationPopup = new PopupWithConfirmation(
  "#confirmation-popup", () => {}
);

let userId: string;

function handleImageClick(name: string, link: string): void {
  imagePopup.open(link, name);
}

async function handleLikeClick(
  cardId: string,
  isLiked: boolean
): Promise<CardData> {
  return api.changeLikeCardStatus(cardId, isLiked);
}

async function handleDeleteClick(cardId: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    confirmationPopup.setSubmitHandler(async () => {
      try {
        await api.deleteCard(cardId);
        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });

    confirmationPopup.open();
  });
}

imagePopup.setEventListeners();
confirmationPopup.setEventListeners();

const cardSection = new Section<CardData>(
  {
    items: [],
    renderer: (item) => {
      const isOwner = item.owner === userId;
      const card = new Card(
        item,
        "#card-template",
        handleImageClick,
        handleDeleteClick,
        isOwner,
        handleLikeClick
      );

      return card.generateCard();
    },
  },
  ".cards__list"
);

async function handleCardFormSubmit(
  formData: Record<string, string>
): Promise<void> {
  try {
  const cardData = {
    name: formData["place-name"],
    link: formData.link,
  };

  const cardDataFromApi = await api.postCard(cardData);

  const isOwner = cardDataFromApi.owner === userId;

  const card = new Card(
    cardDataFromApi,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    isOwner,
    handleLikeClick
  );

  cardSection.addItem(card.generateCard());
} catch (err) {
  console.error(err);
  throw err;
  }
}

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit
);

newCardPopup.setEventListeners();


async function handleProfileFormSubmit(
  formData: Record<string, string>
): Promise<void> {
  try {
    const user = await api.setUserInfo({
      name: formData.name,
      about: formData.description,
    });

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    editFormValidator.resetValidation();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const editPopup = new PopupWithForm(
  "#edit-popup",
  handleProfileFormSubmit
);

editPopup.setEventListeners();

function fillProfileForm(): void {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  descriptionInput.value = userData.about;
}

function openEditProfilePopup(): void {
  fillProfileForm();

  editFormValidator.resetValidation();

  editPopup.open();
}

addButton.addEventListener("click", () => {
  newCardPopup.open();
});

editButton.addEventListener("click", openEditProfilePopup);

const editFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm
);

editFormValidator.enableValidation();

const newCardFormValidator = new FormValidator(
  defaultFormConfig,
  newCardForm
);

newCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  defaultFormConfig,
  avatarForm
);

avatarFormValidator.enableValidation();

const api = new Api(apiConfig);

async function loadData(): Promise<void>{
  try {
    const [user, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userId = user._id;

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    });

    cardSection.setItem(cards);
    cardSection.render();
  } catch (err) {
    console.error(err);
  }
}

loadData();
