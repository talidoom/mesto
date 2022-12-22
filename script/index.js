const content = document.querySelector('.content');
const popupProfile = document.querySelector('.popup_profile');

const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');
const profileCloseButton = popupProfile.querySelector('.popup__close-but');
const formElement = popupProfile.querySelector('.form');
const nameInput = formElement.querySelector('.form__text_type_name');
const jobInput = formElement.querySelector('.form__text_type_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

// ________Поп-ап профиля_____________
// функция для открытия попапа
function popupShowProfile(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupProfile.classList.add('popup_opened');
}
profileEditButton.addEventListener('click', popupShowProfile);

// функция для закрытия попапа
function popupCloseProfile () {
  popupProfile.classList.remove('popup_opened');
}
profileCloseButton.addEventListener('click', popupCloseProfile);

// функция отправки формы
function handleFormSubmit (evt) {
    evt.preventDefault();
  // заполнение профиля из формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  // закрытие попапа
  popupCloseProfile();
}
// срабатывание обработчика по кнопке
formElement.addEventListener('submit', handleFormSubmit);


// _____Галерея карточки______
// массив карточки
const initialCards = [
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

// ___________Попап места_____________
const popupPlace = document.querySelector('.popup_place');
const placeCloseButton = popupPlace.querySelector('.popup__close-but');
const placeAddButton = popupPlace.querySelector('.profile__add-button');
const inputPlaceName = popupPlace.querySelector('.form__text_type_placename');
const inputPlaceLink = popupPlace.querySelector('.form__text_type_link');

const elementsList = document.querySelector('.elements__list');

const elementCard = content.querySelector('.element');
// const elementImg = content.querySelector('.element__pic');
// const elementText = content.querySelector('.element__text');

// открытие поп-апа места
function popupShowPlace(evt) {
  popupPlace.classList.add('popup_opened');
};
profileAddButton.addEventListener('click', popupShowPlace);

// закрытие поп-апа места
function popupClosePlace () {
  popupPlace.classList.remove('popup_opened');
};
placeCloseButton.addEventListener('click', popupClosePlace);

// действие по кнопке Создать
// function addNewCard() {
//   elementText.textContent = inputPlaceName.value;
//   elementImg.alt = inputPlaceName.value;
//   elementImg.src = inputPlaceLink.value;

//   popupClosePlace();
// };
// placeAddButton.addEventListener('submit', addContentElem);

// карточки из массива
const cardTemplate = document.querySelector('.card-template').content;
initialCards.forEach(function (item) {
  const initialElement = cardTemplate.cloneNode(true);
  initialElement.querySelector('.element__text').textContent = item.name;
  initialElement.querySelector('.element__pic').alt = item.name;
  initialElement.querySelector('.element__pic').src = item.link;

  elementsList.append(initialElement);
});
