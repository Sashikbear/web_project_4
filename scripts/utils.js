import FormValidator from "./FormValidator.js";
import { config, attachCard } from "./index.js";
import Card from "./Card.js";
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

function openPopUp(popType) {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closePopUp(popType) {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}
function handleAddButton() {
  const valid = new FormValidator(config, addCardFormElement);
  valid.resetForm();
  openPopUp(popUpAddCard);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: imageTitle.value,
    link: imageLink.value,
  };
  const card = new Card(newCard, "#card", openPopUp);
  attachCard(card.generateCard());
  addCardFormElement.reset();
  closePopUp(popUpAddCard);
}

function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_opened");
    closePopUp(openedPopUp);
  }
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popUpProfile);
}

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
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

export {
  openPopUp,
  handleAddButton,
  handleAddCardFormSubmit,
  openPopUpProfile,
  handleProfileFormSubmit,
};
