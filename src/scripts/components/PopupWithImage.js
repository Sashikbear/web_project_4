import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageZoom = this._popupElement.querySelector(".popup__image");
    this._imageZoomTitle = this._popupElement.querySelector(".popup__title");
  }

  open({ link, name }) {
    super.open();
    this._imageZoom.src = link;
    this._imageZoom.alt = `Image of ${name}`;
    this._imageZoomTitle.textContent = name;
  }
}
export default PopupWithImage;
