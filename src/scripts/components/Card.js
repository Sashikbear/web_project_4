export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".button_type_like");
    this._deleteButton = this._element.querySelector(".button_type_delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImageTitle = this._element.querySelector(".card__title");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", this._handleDeleteButton);
    this._likeButton.addEventListener("click", this._handleLikeButton);
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, src: this._link })
    );
  }

  _handleDeleteButton = () => {
    this._element.remove();
    this._element = null;
  };

  _handleLikeButton = () => {
    this._likeButton.classList.toggle("button_active");
  };

  generateCard() {
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._cardImageTitle.textContent = this._name;
    return this._element;
  }
}
