import Popup from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ link, name }) {
    super.open();
    const imageZoom = this._popupElement.querySelector(".popup__image");
    const imageZoomTitle = this._popupElement.querySelector(".popup__title");
    imageZoom.src = link;
    imageZoom.alt = `Image of ${name}`;
    imageZoomTitle.textContent = name;
  }
}
export default PopupWithImage;
