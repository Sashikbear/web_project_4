let editButton = document.querySelector(".button_type_edit");
let closeButton = document.querySelector(".button_type_close");
let popUp = document.querySelector(".popup");
let profileName = document.querySelector(".profile__user-name");
let profileJob = document.querySelector(".profile__user-job");
let nameInput = document.querySelector(".popup__form-input_type_name");
let jobInput = document.querySelector(".popup__form-input_type_job");

nameInput.setAttribute("placeholder", `${profileName.textContent}`);
jobInput.setAttribute("placeholder", `${profileJob.textContent}`);
function togglePopUp() {
  popUp.classList.toggle("popup_opened");
}
editButton.addEventListener("click", togglePopUp);
closeButton.addEventListener("click", togglePopUp);

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopUp();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
