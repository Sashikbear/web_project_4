import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, buttonText) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._button = this._popupElement.querySelector(".popup__button");
    this._buttonText = buttonText;
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

  formReset() {
    this._popupForm.reset();
  }

  showLoading() {
    this._button.textContent = "Saving...";
  }
  hideLoading() {
    this._button.textContent = this._buttonText;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () =>
      this._handleFormSubmit(this._getInputValues())
    );
  }
}
export default PopupWithForm;
