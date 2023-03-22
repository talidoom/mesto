import Card from './components/Card.js';
import Section from "./components/Section.js";
import { validationConfig } from './constants/constants.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupDelete from './components/PopupDelete.js';
import UserInfo from './components/UserInfo.js';
import FormValidation from './components/FormValidator.js';
import Api from './components/API.js';
import '../pages/index.css';

const content = document.querySelector('.content');
const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');

const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const aboutInput = formEditProfile.querySelector('.form__input_type_about');
const formAddPlace = document.forms.editplace;
const formEditAvatar = document.forms.editavatar;
const editButtonAvatar = content.querySelector('.profile__edit-avatar');

const formAddPlaceValidator = new FormValidation(validationConfig, formAddPlace);
const formEditProfileValidator = new FormValidation(validationConfig, formEditProfile);
const formEditAvatarValidator = new FormValidation(validationConfig, formEditAvatar);
// валидация
formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();
formEditAvatarValidator.enableValidation();

// попап профиля
const editProfilePopup = new PopupWithForm(".popup_type_profile", handleFormSubmit);
// попап карточки
const popupAddPlace = new PopupWithForm(".popup_type_place", createNewCard);
// попап изменения аватара
const popapAvatar = new PopupWithForm(".popup_type_edit-avatar", changeAvatar);
// попап открытой картинки
const scaleImagePopup = new PopupWithImage(".popup_type_picture");
// попап удаления
const popupDelete = new PopupDelete('.popup_type_delete-card');

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', '246e7422-483c-4e41-82f4-4aaaa5291029');

const cardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.setItem(cardElement);
    },
  }, ".elements__list");

  // инфо профиля
const user = new UserInfo({
  userNameSelector: '.profile__name', 
  userInfoSelector: '.profile__job', 
  userUrlSelector: '.profile__avatar'
});

function handleFormSubmit (item) {
    editProfilePopup.renderLoading(true);
    api.setUserInfo(item)
      .then((data) => {
        user.setUserInfo(data);
        editProfilePopup.close();
      }).catch((err) => {
        console.log(`Ошибка ${err}`);
      }).finally(() => {
        editProfilePopup.renderLoading(false);
      });
  };

function changeAvatar (item) {
    popapAvatar.renderLoading(true);
    api.setUserAvatar(item)
      .then((data) => {
        user.changeAvatarPicture(data);
        popapAvatar.close();
      }).catch((err) => {
        console.log(`Ошибка ${err}`);
      }).finally(() => {
        popapAvatar.renderLoading(false);
      });
  };

function likeClick(card) {
  const promise = card.isLiked(card) ? api.deleteLike(card._id) : api.setLike(card._id);
  promise
    .then((data) => {
      card.setLike(data);
    }).catch((err) => {
      console.log(`Ошибка ${err}`);
    });
};

function deleteCard(id, elem) {
  popupDelete.open();
  popupDelete.setFormSubmit(() => {
    return api.deleteCard(id)
      .then(() => {
        elem.remove();
        popupDelete.close()
      }).catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  })
};

function createCard(item) {
  const card = new Card(
    item,
    currentUserId,
    '.card-template',
    deleteCard,
    likeClick,
    (name, link) => { scaleImagePopup.openPic(name, link); });
  return card.genereateCard();
};

function createNewCard (data, currentUserId) {
  popupAddPlace.renderLoading(true);
  api.createCard(data)
    .then((newData) => {
      const newCard = createCard(newData, currentUserId);
      cardList.setItem(newCard);
      popupAddPlace.close();
    }).catch((err) => {
      console.log(`Ошибка ${err}`);
    }).finally(() => {
      popupAddPlace.renderLoading(false);
    });
};

let currentUserId;
Promise.all([api.getCards(), api.getCurrentUser()])
  .then(([items, userData]) => {
    currentUserId = userData._id;
    cardList.renderItems(items);
    user.setUserInfo(userData);
  }).catch((err) => {
    console.log(`Ошибка ${err}`);
  });

// слушатели
popupAddPlace.setEventListeners();
editProfilePopup.setEventListeners();
popapAvatar.setEventListeners();
scaleImagePopup.setEventListeners();
popupDelete.setEventListeners();

profileEditButton.addEventListener('click', () => {
  editProfilePopup.open()
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;
  formEditProfileValidator.resetValidition();
});

editButtonAvatar.addEventListener('click', () => {
  popapAvatar.open();
  formEditAvatarValidator.resetValidition();
});

profileAddButton.addEventListener('click', () => {
  popupAddPlace.open();
  formAddPlaceValidator.resetValidition();
});
