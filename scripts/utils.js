function openPopUp(popType) {
  popType.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}
function closePopUp(popType) {
  popType.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_opened");
    closePopUp(openedPopUp);
  }
}

export { openPopUp, closePopUp };
