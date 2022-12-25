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

// ___________________Поп-ап профиля___________________
// функция для открытия попапа
function popupShowProfile(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popupProfile.classList.add('popup_opened');
};
profileEditButton.addEventListener('click', popupShowProfile);

// функция для закрытия попапа
function popupCloseProfile () {
  popupProfile.classList.remove('popup_opened');
};
profileCloseButton.addEventListener('click', popupCloseProfile);

// функция отправки формы
function handleFormSubmit (evt) {
    evt.preventDefault();
  // заполнение профиля из формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  // закрытие попапа
  popupCloseProfile();
};
// срабатывание обработчика по кнопке
formElement.addEventListener('submit', handleFormSubmit);


// ________________Попап места__________________
const popupPlace = document.querySelector('.popup_place');
const placeCloseButton = popupPlace.querySelector('.popup__close-but');
const placeAddButton = popupPlace.querySelector('.profile__add-button');
const formPlace = popupPlace.querySelector('.form');
const elementsList = document.querySelector('.elements__list');
const inputPlaceName = popupPlace.querySelector('.form__text_type_placename');
const inputPlaceLink = popupPlace.querySelector('.form__text_type_link');
const cardTemplate = document.querySelector('.card-template').content;
const popupPic = document.querySelector('.popup_picture')
const popupPicBlock = document.querySelector('.popup__pic-block')
const pictureCloseButton = popupPic.querySelector('.popup__close-but');
const popupImg = popupPic.querySelector('.popup__img')


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


// _____Галерея создания карточки______
// карточки из массива
initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elementsList.append(newCard);
});

// лайк
function setLike(evt) {
  evt.target.classList.toggle("element__like-button_active");
};

// Корзина-удаление карточки
function resetCard (evt) {
    const seachCard =  evt.target.closest('.element');
    seachCard.remove();
};

// открытие картинки попап
function openPicture(name, link) {
  popupImg.alt = name;
  popupImg.src = link;
  popupPic.classList.add('popup_opened');
};

// функция для закрытия картинки попапа
function popupClosePic () {
  popupPic.classList.remove('popup_opened');
};
pictureCloseButton.addEventListener('click', popupClosePic);

// действие по кнопке Создать
function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const elemPic = newCard.querySelector('.element__pic');
  newCard.querySelector('.element__text').textContent = item.name;
  elemPic.alt = item.name;
  elemPic.src = item.link;
  const likeButton = newCard.querySelector('.element__like-button');
  likeButton.addEventListener("click", (evt) => setLike(evt));

  const buttonReset = newCard.querySelector('.element__trash');
  buttonReset.addEventListener("click", (evt) => resetCard(evt));

  elemPic.addEventListener('click', () => openPicture(item.name, item.link));
  return newCard;
};

// кнопка создать попап
formPlace.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard({name: inputPlaceName.value, link: inputPlaceLink.value});
  elementsList.prepend(newCard);
  popupClosePlace();

  inputPlaceName.value = '';
  inputPlaceLink.value = '';
});
