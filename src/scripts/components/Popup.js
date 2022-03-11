export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener(
      "mousedown",
      this._handleMouseDownClose
    );
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleMouseDownClose
    );
  }
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _handleMouseDownClose = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("button_type_close")
    ) {
      this.close();
    }
  };
}
