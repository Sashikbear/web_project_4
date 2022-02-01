import { config, FormValidator } from "./validate.js";

// selecting DOM elements
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const popUpProfile = document.querySelector(".popup_type_profile");
const popUpAddCard = document.querySelector(".popup_type_add-card");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_add-card");
const imageTitle = document.querySelector(".popup__input_type_image-title");
const imageLink = document.querySelector(".popup__input_type_image-link");
const allPopUps = document.querySelectorAll(".popup");

// default array of cards, reversing it, so that prepend works for rendering the initial array in given order and adding new cards later on
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

class Card {
  constructor(card, cardSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._element = cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardImage();
      });
  }

  _handleDeleteButton() {
    this._element
      .querySelector(".button_type_delete")
      .closest(".card")
      .remove();
  }
  _handleLikeButton() {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_active");
  }
  _handleCardImage() {
    const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
    const imageZoom = document.querySelector(".popup__image");
    const imageZoomTitle = document.querySelector(".popup__title");
    openPopUp(popUpImageZoom);
    imageZoom.src = this._element.querySelector(".card__image").src;
    imageZoom.alt = this._element.querySelector(".card__title").textContent;
    imageZoomTitle.textContent =
      this._element.querySelector(".card__title").textContent;
  }
  generateCard() {
    this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._link;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}

initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, "#card");
  const cardElement = card.generateCard();

  document.querySelector(".cards__card-grid").prepend(cardElement);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popUpProfile);
}

function handleAddButton() {
  const valid = new FormValidator(config, addCardFormElement);
  valid.resetForm();
  openPopUp(popUpAddCard);
}
// submitting form to add a new object to the array with name and link keys and the values taken from the inputs
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const card = { name: imageTitle.value, link: imageLink.value };
  attachCard(card);
  addCardFormElement.reset();
  closePopUp(popUpAddCard);
}
// generic reusable functions for opening and closing every popup including adding and removing eventlistener on keydown
function openPopUp(popType) {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closePopUp(popType) {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
// on opening the popup the input fields are prefilled from the hardcoded html text content
function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
//  function closing the opened popup in the event of escape key
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    // find the opened popup
    const openedPopUp = document.querySelector(".popup_opened");
    // close the opened popup with `closePopup`
    closePopUp(openedPopUp);
  }
}

//universal function going through all popups and attacheing to each eventlisteners to close popup in case if the clicked target is either the overlay (the outside of the popup) or the close button
allPopUps.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopUp(popup);
    }
    if (evt.target.classList.contains("button_type_close")) {
      closePopUp(popup);
    }
  });
});

// adding other eventlisteners
editButton.addEventListener("click", openPopUpProfile);

addButton.addEventListener("click", handleAddButton);

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
