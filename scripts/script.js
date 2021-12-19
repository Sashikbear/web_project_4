let editButton = document.querySelector(".button_type_edit");
let closeButton = document.querySelector(".button_type_close");
let popUp = document.querySelector(".popup");
let profileName = document.querySelector(".profile__user-name");
let profileJob = document.querySelector(".profile__user-job");
let nameInput = document.querySelector(".popup__form-input_type_name");
let jobInput = document.querySelector(".popup__form-input_type_job");
let formElement = document.querySelector(".popup__form");

function openPopUp() {
  popUp.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editButton.addEventListener("click", openPopUp);
function closePopUp() {
  popUp.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopUp);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopUp();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
