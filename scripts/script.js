import { resetForm, config } from "./validate.js";

// selecting DOM elements
const cardGrid = document.querySelector(".cards__card-grid");
const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const closeProfileButton = document.querySelector(".button_location_profile");
const closeAddCardButton = document.querySelector(".button_location_add-card");
const closeZoomCardButton = document.querySelector(
  ".button_location_zoom-card"
);
const popUpProfile = document.querySelector(".popup_type_profile");
const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
const popUpAddCard = document.querySelector(".popup_type_add-card");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-job");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_add-card");
const imageTitle = document.querySelector(".popup__input_type_image-title");
const imageLink = document.querySelector(".popup__input_type_image-link");
const imageZoom = document.querySelector(".popup__image");
const imageZoomTitle = document.querySelector(".popup__title");
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
// creating a new card
const addCard = (card) => {
  // selecting DOM element's contents
  const cardTemplate = document.querySelector("#card").content;
  // copying DOM element's contents
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // selecting parts of the new element
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".button_type_delete");
  const likeButton = cardElement.querySelector(".button_type_like");
  // giving values from the array of objects to properties
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  // adding functionality to the buttons
  deleteButton.addEventListener("click", handleDeleteButton);
  likeButton.addEventListener("click", handleLikeButton);
  cardImage.addEventListener("click", handleCardImage);
  return cardElement;
};
// passing the return of the addCard function to the new function to prepend the card
const attachCard = (card) => {
  cardGrid.prepend(addCard(card));
};
initialCards.forEach(attachCard);
// submitting form to change the text content of profile fields from the inputs
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp(popUpProfile);
}
// zooming in on the picture
function handleCardImage(evt) {
  openPopUp(popUpImageZoom);
  // giving value to img properties using the event target, fetching the name from the alt prevously sourced from the name key
  imageZoom.src = evt.target.src;
  imageZoom.alt = evt.target.alt;
  imageZoomTitle.textContent = evt.target.alt;
}
// deleting the closest parent of the button - the card in which this button is located
function handleDeleteButton(evt) {
  evt.target.closest(".card").remove();
}
// changing the class from tansparent heart to filled heart to create the liked effect
function handleLikeButton(event) {
  event.target.classList.toggle("button_active");
}
// on pressing add button run this function that resets the form and disables the submit button
function handleAddButton() {
  resetForm(addCardFormElement, config);
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
// generic reusable functions for opening and closing every popup
function openPopUp(popType) {
  popType.classList.add("popup_opened");
}
function closePopUp(popType) {
  popType.classList.remove("popup_opened");
}
// on opening the popup the input fields are prefilled from the hardcoded html text content
function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// for each of the popups add 2 eventlisteners to close the modal on clicking outside the modal and on pressing esc
function closePopUpOnMouseOutKeyDown(allPopUps) {
  allPopUps.forEach((popUp) => {
    popUp.addEventListener("click", function (evt) {
      closePopUp(evt.target);
    });
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") closePopUp(popUp);
    });
  });
}
closePopUpOnMouseOutKeyDown(allPopUps);

// adding functionality to the buttons
editButton.addEventListener("click", openPopUpProfile);

closeProfileButton.addEventListener("click", () => closePopUp(popUpProfile));

closeZoomCardButton.addEventListener("click", () => closePopUp(popUpImageZoom));

addButton.addEventListener("click", handleAddButton);

closeAddCardButton.addEventListener("click", () => closePopUp(popUpAddCard));

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);
