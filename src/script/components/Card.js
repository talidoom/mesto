export default class Card {
  constructor(data, currentUserId, templateSelector, deleteCardApi, likeClick, openPicture) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._deleteCardApi = deleteCardApi;
    this._likeClick = likeClick;
    this._openPic = openPicture;
  }

  _getElementFromTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
  }
  _getViewTrash() {
    if (this._ownerId === this._currentUserId) {
      this._element.querySelector('.element__trash').classList.add('element__trash_show');
    }
  }

  _setEventListeners() {
    this._element.querySelector('.element__trash').addEventListener('click', () => this._deleteCard());
    this._element.querySelector('.element__like-button').addEventListener('click', () => this._likeClick(this));
    this._element.querySelector('.element__pic').addEventListener('click', () => {
      this._openPic(this._name, this._link);
    });
  }

  _deleteCard() {
    this._deleteCardApi(this._id, this._element);
  };

  isLiked() {
    return this._isLiked;
  }

  setLike(data) {
    this._isLiked = data.likes.filter((item) => { return item._id == this._currentUserId; }).length > 0;
    this._counter.textContent = data.likes.length;
    if (this._isLiked) {
      this._buttonLike.classList.add('element__like-button_active');
    } else {
      this._buttonLike.classList.remove('element__like-button_active');
    }
  }

  genereateCard() {
    this._element = this._getElementFromTemplate();
    this._cardImage = this._element.querySelector('.element__pic');
    this._cardTitle = this._element.querySelector('.element__text');
    this._counter = this._element.querySelector('.element__like-counter');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._likes.forEach(elem => {
      if (elem._id === this._currentUserId) {
        this._buttonLike.classList.add('element__like-button_active');
      }
    });
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    this._getViewTrash();
    this._counter.textContent = this._likes.length;
    return this._element;
  };
}