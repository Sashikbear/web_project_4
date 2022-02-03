export default class Card {
  constructor(card, cardSelector, openPopUp) {
    this._name = card.name;
    this._link = card.link;
    this._cardSelector = cardSelector;
    this._openPopUp = openPopUp;
  }
  // getter now returns an element
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", this._handleDeleteButton);
    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", this._handleLikeButton);
    this._element
      .querySelector(".card__image")
      .addEventListener("click", this._handleCardImage);
  }
  // using arrow functions in methods instead of when calling on the method inside an event listener
  // removing the card correctly and setting element to null to remove the link to the DOM element
  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _handleLikeButton = () => {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_active");
  };

  _handleCardImage = () => {
    const popUpImageZoom = document.querySelector(".popup_type_zoom-card");
    const imageZoom = document.querySelector(".popup__image");
    const imageZoomTitle = document.querySelector(".popup__title");
    this._openPopUp(popUpImageZoom);
    imageZoom.src = this._element.querySelector(".card__image").src;
    imageZoom.alt = this._element.querySelector(".card__title").textContent;
    imageZoomTitle.textContent =
      this._element.querySelector(".card__title").textContent;
  };
  // using the element created in getTemplate method
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    const cardName = this._element.querySelector(".card__title");
    cardImage.src = this._link;
    cardImage.alt = this._link;
    cardName.textContent = this._name;
    return this._element;
  }
}
