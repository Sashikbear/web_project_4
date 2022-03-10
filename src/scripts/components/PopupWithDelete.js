import Popup from "./Popup.js";
class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popupElement.querySelector(".popup__button");
  }
  setAction(action) {
    this._submitHandler = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
  processing() {
    this._button.textContent = "Deleting...";
  }
  open() {
    this._button.textContent = "Yes";

    super.open();
  }
}
export default PopupWithDelete;
