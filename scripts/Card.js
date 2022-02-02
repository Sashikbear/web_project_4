export default class Card {
  constructor(card, cardSelector, openPopUp) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._openPopUp = openPopUp;
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
    this._openPopUp(popUpImageZoom);
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
