export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

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
      .addEventListener("click", () =>
        this._handleCardClick({ name: this._name, src: this._link })
      );
  }

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _handleLikeButton = () => {
    this._element
      .querySelector(".button_type_like")
      .classList.toggle("button_active");
  };

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
