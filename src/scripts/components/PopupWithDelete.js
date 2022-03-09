import Popup from "./Popup.js";
class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
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
}
export default PopupWithDelete;
