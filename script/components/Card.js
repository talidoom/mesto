// массив карточки
export default class Card {
  constructor(name, link, templateSelector, openPicture) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._openPicture = openPicture;
  }
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  _setLike(evt) {
    evt.target.classList.toggle("element__like-button_active");
  }
  _deleteCard () {
    this._element.remove();
  }
  _addEventListener() {
    this._element.querySelector('.element__like-button').addEventListener("click", (evt) => this._setLike(evt));
    this._element.querySelector('.element__trash').addEventListener("click", (evt) => this._deleteCard(evt));
    this._elementPic.addEventListener('click', () => this._openPicture(this._name, this._link));
  }
  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.element__text').textContent = this._name;
    this._elementPic = this._element.querySelector('.element__pic');
    this._elementPic.alt = this._name;
    this._elementPic.src = this._link;
    this._addEventListener();
    return this._element;
  }
}
