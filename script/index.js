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

const formAddPlaceValidator = new formValidation(validationConfig, formAddPlace);
const formEditProfileValidator = new formValidation(validationConfig, formEditProfile);
formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();

// функция Esc
function handleEscPopup (evt) {
  evt.preventDefault();
  if(evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

// Закрытие поп-апа
function closePopup(item) {
  document.removeEventListener('keyup', handleEscPopup);
  item.classList.remove('popup_opened');
  item.removeEventListener('click', closePopupByClick);
};

// Открытие поп-апа
function openPopup(item) {
  document.addEventListener('keyup', handleEscPopup);
  item.classList.add('popup_opened');
  item.addEventListener('click', closePopupByClick);
};

// функцмя для открытмя попапа место
function showPopupAddPlace () {
  formAddPlace.reset();
  formAddPlaceValidator.resetValidition();
  openPopup(popupAddPlace);
};

// функция закрытия через оверлей
function closePopupByClick (evt) {
  if(evt.target === evt.currentTarget){
   closePopup(evt.currentTarget);
  }
  if (evt.target.classList.contains('popup__close-but')) {
    closePopup(evt.currentTarget);
  }
};

// __________форма профиля_____________
// внесение формы профиляя
function showPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formEditProfileValidator.resetValidition();
  openPopup(popupProfile);
};

// Отправка формы профиля
function submitEditProfileForm (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
};

// поп-ап изображения отдельной карточки
function openPicture(name, link) {
  popupImg.alt = name;
  popupImg.src = link;
  popupDescription.textContent = name;
  openPopup(popupPicture);
};

// ________________________________Галерея создания карточки______
// карточки из массива
initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  elementsList.append(cardElement);
});

// действие по кнопке Создать
function createCard(item) {
  const newCard = new Card(item, '.card-template', openPicture);
  const cardElement = newCard.createCard();
  return cardElement;
};

// кнопка создать попап
formAddPlace.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard({name: evt.target.placename.value, link: evt.target.link.value});
  elementsList.prepend(newCard);
  closePopup(popupAddPlace);
  evt.target.reset();
});

// Слушатели открытия-закрытия по-ап
profileEditButton.addEventListener('click', showPopupProfile); // открытие поп-ап профиля
profileAddButton.addEventListener('click', showPopupAddPlace); // открытие поп-ап галлереи
formEditProfile.addEventListener('submit', submitEditProfileForm); // отправка формы профиля
