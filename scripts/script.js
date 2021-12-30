const editButton = document.querySelector(".button_type_edit");
const closeProfileButton = document.querySelector(
  ".button__button-close_location_profile"
);
const closeAddCardButton = document.querySelector(
  ".button__button-close_location_add-card"
);
const addButton = document.querySelector(".button_type_add");
const popUpProfile = document.querySelector(".popup_type_profile");
const popUp = document.querySelector(".popup");
const profileName = document.querySelector(".profile__user-name");
const profileJob = document.querySelector(".profile__user-job");
const nameInput = document.querySelector(".popup__form-input_type_name");
const jobInput = document.querySelector(".popup__form-input_type_job");
const profileFormElement = document.querySelector(".popup__form_type_profile");
const addCardFormElement = document.querySelector(".popup__form_type_add-card");
const popUpAddCard = document.querySelector(".popup_type_add-card");
const imageTitle = document.querySelector(
  ".popup__form-input_type_image-title"
);
const imageLink = document.querySelector(".popup__form-input_type_image-link");
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

function openPopUp(popType) {
  popType.classList.add("popup_opened");
}
function closePopUp(popType) {
  popType.classList.remove("popup_opened");
}
function openPopUpProfile() {
  openPopUp(popUpProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editButton.addEventListener("click", openPopUpProfile);
function closePopUpProfile() {
  closePopUp(popUpProfile);
}
closeProfileButton.addEventListener("click", closePopUpProfile);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUpProfile();
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const addCard = (card) => {
  const cardTemplate = document.querySelector("#card").content;
  const cardGrid = document.querySelector(".cards__card-grid");
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = `photo of ${card.name}`;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardGrid.prepend(cardElement);
};

const populateCardGrid = () => {
  initialCards.forEach((card) => {
    addCard(card);
  });
};
populateCardGrid();
