export default class UserInfo {
  constructor({
    name,
    about,
    avatar,
    _id,
    userNameSelector,
    userAboutSelector,
    avatarSelector,
  }) {
    (this._name = name),
      (this._about = about),
      (this._avatar = avatar),
      (this._id = _id),
      (this._userNameElement = document.querySelector(userNameSelector)),
      (this._userAboutElement = document.querySelector(userAboutSelector)),
      (this._avatarElement = document.querySelector(avatarSelector));
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._userNameElement.textContent = name || this._name;
    this._userAboutElement.textContent = about || this._about;
    this._avatarElement.src = avatar || this._avatar;
    this._avatarElement.alt = name || this._name;
  }
}
