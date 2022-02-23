import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import {
  nameInput,
  jobInput,
  profileFormElement,
  addCardFormElement,
  editButton,
  addButton,
  initialCards,
  config,
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

/* ---------------------------- form validations ---------------------------- */

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profileFormElement);
profileFormValidator.enableValidation();

/* ------------- new classes' instances with necessary selectors ------------ */

const userInfo = new UserInfo({
  userNameSelector: ".profile__user-name",
  userJobSelector: ".profile__user-job",
});

const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
const imagePopup = new PopupWithImage(".popup_type_zoom-card");

/* -- enable inherited eventlisteners on instances from parent Popup class -- */

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

/* ------------------------ editing the profile block ----------------------- */

function handleProfileFormSubmit({ name: name, job: job }) {
  userInfo.setUserInfo({ name, job });
}

function handleEditButton() {
  profilePopup.open();
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidator.resetInputs();
}
function handleAddButton() {
  addCardFormValidator.resetWholeForm();
  addCardPopup.open();
}
editButton.addEventListener("click", handleEditButton);

/* --- using new instance of Card class to create a ready-for-dusplay card -- */

function createCard({ data }) {
  const card = new Card(
    {
      data,
      handleCardClick: () => {
        imagePopup.open({ link: data.link, name: data.name });
      },
    },
    "#card"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

/* ------ using new instance of Section class to display initial cards ------ */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard({ data }));
    },
  },
  ".cards__card-grid"
);
cardList.renderItems();

/* ------------------------ adding new card block ----------------------- */

function handleAddCardFormSubmit() {
  const inputValues = addCardPopup._getInputValues();
  const data = {
    name: inputValues.name,
    link: inputValues.url,
  };
  cardList.addItem(createCard({ data }));
}
addButton.addEventListener("click", handleAddButton);
