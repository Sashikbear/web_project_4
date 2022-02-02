import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import * as utils from "./utils.js";

const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_add-card");

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

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const valid = new FormValidator(config, formElement);
    valid.enableValidation();
  });
}

enableValidation(config);

editButton.addEventListener("click", utils.openPopUpProfile);

addButton.addEventListener("click", utils.handleAddButton);

profileFormElement.addEventListener("submit", utils.handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", utils.handleAddCardFormSubmit);

export { config, attachCard };
