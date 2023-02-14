// массив карточки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export class Card {
  constructor(data, templateSelector, openPicture) {
    this._name = data.name;
    this._link = data.link;
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
  createCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.element__text').textContent = this._name;
    this._elementPic = this._element.querySelector('.element__pic');
    this._elementPic.alt = this._name;
    this._elementPic.src = this._link;
    this._addEventListener();
    return this._element;
  }
}
