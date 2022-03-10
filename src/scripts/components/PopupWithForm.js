import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._button = this._popupElement.querySelector(".popup__button");
    this._inputs = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  processing() {
    this._button.textContent = "Saving...";
  }
  open() {
    if (this._button.id === "create") {
      this._button.textContent = "Create";
    } else {
      this._button.textContent = "Save";
    }

    super.open();
  }
  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", () =>
      this._handleFormSubmit(this._getInputValues())
    );
  }
}
export default PopupWithForm;
