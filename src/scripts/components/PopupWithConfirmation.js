import Popup from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popupElement.querySelector(".popup__button");
  }
  setAction(action) {
    this._handleSubmit = action;
  }
  setEventListeners() {
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    });
  }
  showLoading() {
    this._button.textContent = "Deleting...";
  }
  hideLoading() {
    this._button.textContent = "Yes";
  }
}
export default PopupWithConfirmation;
