import Card from './components/Card.js';
import Section from "./components/Section.js";
import { initialCards, validationConfig } from './constants/constants.js';
import PopupWithImages from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import FormValidation from './components/FormValidator.js';
import '../pages/index.css';

const content = document.querySelector('.content');
const popupProfile = document.querySelector('.popup_profile');
const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');

const formEditProfile = document.forms.editprofile;
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');
const popupAddPlace = document.querySelector('.popup_place');
const formAddPlace = document.forms.editplace;
const elementsList = document.querySelector('.elements__list');
const popupPicture = document.querySelector('.popup_picture');
const popupImg = popupPicture.querySelector('.popup__img');
const popupDescription = popupPicture.querySelector('.popup__description');

const formAddPlaceValidator = new FormValidation(validationConfig, formAddPlace);
const formEditProfileValidator = new FormValidation(validationConfig, formEditProfile);

// попап профиля
const editProfilePopup = new PopupWithForm(".popup_profile", submitProfileForm);
// попап карточки
const addImagePopup = new PopupWithForm(".popup_place", submitCardForm);
// попап открытой картинки
const scaleImagePopup = new PopupWithImages(".popup_picture");
// добавить карточку
const cardsArray = new Section({
    items: initialCards,
    renderer: (card) => {
      addNewCard(createCard(card.name, card.link));
    },
  }, ".elements__list");

  // инфо профиля
const profile = new UserInfo({
  userName: '.profile__name',
  userJob: '.profile__job',
});

// заполнение формы профиля
function handleProfile() {
  const dataProfile = profile.getUserInfo();
  nameInput.value = dataProfile.name;
  jobInput.value = dataProfile.job;
}
// сохранение данных профиля
function submitProfileForm (data) {
  profile.setUserInfo(data);
}

profileEditButton.addEventListener('click', () => {
  formEditProfileValidator.enableValidation();
  formEditProfileValidator.resetValidition();
  editProfilePopup.open();
  handleProfile();
});
profileAddButton.addEventListener("click", () => {
  formAddPlaceValidator.enableValidation();
  formAddPlaceValidator.resetValidition();
  addImagePopup.open();
});

// поп-ап изображения отдельной карточки
function openPicture(name, link) {
  scaleImagePopup.open(name, link);
};

// создание карточки
function createCard(name, link) {
  const newCard = new Card(name, link, '.card-template', openPicture);
  return newCard.generateCard();
};

function addNewCard(card) {
  cardsArray.addItem(card);
}
cardsArray.renderItems();

function submitCardForm() {
  const card = createCard(imageNameInput.value, imageLinkInput.value);
  addNewCard(card);
}


// валидация
formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();