export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteCard, handleLikeButton },
    cardSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(this._id)
    );
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButton(this._id)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({ name: this._name, src: this._link })
    );
  }

  removeCardFromDOM = () => {
    this._element.remove();
    this._element = null;
  };
  isLiked() {
    return this._likes.some((person) => person._id === this._userId);
  }
  handleLikeCard = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
  };
  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._likeButton.classList.add("button_active");
    } else {
      this._likeButton.classList.remove("button_active");
    }
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".button_type_like");
    this._deleteButton = this._element.querySelector(".button_type_delete");
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImageTitle = this._element.querySelector(".card__title");
    this._likesCount = this._element.querySelector(".card__like-counter");
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._cardImageTitle.textContent = this._name;
    this._renderLikes();
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = "none";
    }
    return this._element;
  }
}
