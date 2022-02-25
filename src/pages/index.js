import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import {
  nameInput,
  jobInput,
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

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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

function handleProfileFormSubmit(userData) {
  userInfo.setUserInfo(userData);
  profilePopup.close();
}

function handleEditButton() {
  profilePopup.open();
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  formValidators["form-profile"].resetValidation();
}

editButton.addEventListener("click", handleEditButton);

/* ------ using new instance of Section class to display initial cards ------ */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) =>
      new Card(
        {
          data,
          handleCardClick: () => {
            imagePopup.open({ link: data.link, name: data.name });
          },
        },
        "#card"
      ).generateCard(),
  },
  ".cards__card-grid"
);

cardList.renderItems();

/* ------------------------ adding new card block ----------------------- */

function handleAddCardFormSubmit({ name, url }) {
  const data = {
    name: name,
    link: url,
  };
  cardList.addItem(data);
  addCardPopup.close();
}
function handleAddButton() {
  addCardPopup.open();
  formValidators["form-add-card"].resetValidation();
}
addButton.addEventListener("click", handleAddButton);
