import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import * as utils from "./utils.js";
const popUpProfile = document.querySelector(".popup_type_profile");
const popUpAddCard = document.querySelector(".popup_type_add-card");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const imageTitle = document.querySelector(".popup__input_type_image-title");
const imageLink = document.querySelector(".popup__input_type_image-link");
const allPopUps = document.querySelectorAll(".popup");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_add-card");
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
].reverse();

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const attachCard = (card) => {
  document.querySelector(".cards__card-grid").prepend(card);
};

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card", utils.openPopUp);
  attachCard(card.generateCard());
});

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

function handleAddButton() {
  addCardFormValidator.resetWholeForm();
  utils.openPopUp(popUpAddCard);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: imageTitle.value,
    link: imageLink.value,
  };
  const card = new Card(newCard, "#card", utils.openPopUp);
  attachCard(card.generateCard());
  utils.closePopUp(popUpAddCard);
}

const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  utils.closePopUp(popUpProfile);
}
function openPopUpProfile() {
  profileFormValidator.resetInputs();
  utils.openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
allPopUps.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      utils.closePopUp(popup);
    }
    if (evt.target.classList.contains("button_type_close")) {
      utils.closePopUp(popup);
    }
  });
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

editButton.addEventListener("click", openPopUpProfile);

addButton.addEventListener("click", handleAddButton);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

export { config, attachCard };
