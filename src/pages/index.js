import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import {
  nameInput,
  jobInput,
  editButton,
  addButton,
  avatar,
  config,
} from "../scripts/utils/constants.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithDelete from "../scripts/components/PopupWithDelete.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
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
  userAboutSelector: ".profile__user-job",
  avatarSelector: ".profile__image",
});

const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  ".popup_type_add-card",
  handleAddCardFormSubmit
);
const avatarPopup = new PopupWithForm(".popup_type_avatar", handleAvatarSubmit);
const imagePopup = new PopupWithImage(".popup_type_zoom-card");
const deletePopup = new PopupWithDelete(".popup_type_delete");

/* -- enable inherited eventlisteners on instances from parent Popup class -- */

profilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

/* ------------------------ editing the profile block ----------------------- */

function handleProfileFormSubmit(userData) {
  profilePopup.processing();
  api
    .editProfile(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      profilePopup.close();
    });
}

function handleEditButton() {
  profilePopup.open();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidators["form-profile"].resetValidation();
}

editButton.addEventListener("click", handleEditButton);

/* ------ using new instance of Section class to display initial cards ------ */

const cardList = new Section(
  {
    renderer: (data) => {
      const card = new Card(
        {
          data,
          handleCardClick: () => {
            imagePopup.open({ link: data.link, name: data.name });
          },
          handleDeleteCard: (id) => {
            deletePopup.open();

            deletePopup.setAction(() => {
              deletePopup.processing();
              api.deleteCard(id).finally(() => {
                card.removeCardFromDOM();
                deletePopup.close();
              });
            });
          },
          handleLikeButton: (id) => {
            const isAlreadyliked = card.isLiked();
            if (isAlreadyliked) {
              api.unlikeCard(id).then((res) => {
                card.handleLikeCard(res.likes);
              });
            } else {
              api.likeCard(id).then((res) => {
                card.handleLikeCard(res.likes);
              });
            }
          },
        },
        "#card",
        userId
      );
      return card.generateCard();
    },
  },
  ".cards__card-grid"
);

/* ------------------------ adding new card block ----------------------- */

function handleAddCardFormSubmit({ name, url }) {
  addCardPopup.processing();
  const data = {
    name: name,
    link: url,
  };
  api
    .createCard(data)
    .then((res) => {
      cardList.addItem(res);
    })
    .finally(() => {
      addCardPopup.close();
    });
}
function handleAddButton() {
  addCardPopup.open();
  formValidators["form-add-card"].resetValidation();
}
addButton.addEventListener("click", handleAddButton);

/* ------------------------ invoking Api instance with valid token ----------------------- */

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "0d380c06-5bf9-4f9e-b38f-f8e4b1728003",
    "Content-Type": "application/json",
  },
});

/* ------------------------ populating page with  initial data ----------------------- */

let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });
    cardList.renderItems(cardData.reverse());
  }
);

/* ------------------------ updating avatar block ----------------------- */

function handleAvatarClick() {
  avatarPopup.open();
  formValidators["form-avatar"].resetValidation();
}
avatar.addEventListener("click", handleAvatarClick);
function handleAvatarSubmit(userData) {
  avatarPopup.processing();
  api
    .editAvatar(userData)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .finally(() => {
      avatarPopup.close();
    });
}
