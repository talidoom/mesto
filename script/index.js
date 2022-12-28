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

const popupPlace = document.querySelector('.popup_place');
const placeCloseButton = popupPlace.querySelector('.popup__close-but');
const placeAddButton = popupPlace.querySelector('.profile__add-button');
const formPlace = popupPlace.querySelector('.form');
const elementsList = document.querySelector('.elements__list');
const inputPlaceName = popupPlace.querySelector('.form__text_type_placename');
const inputPlaceLink = popupPlace.querySelector('.form__text_type_link');
const cardTemplate = document.querySelector('.card-template').content;
const popupPicture = document.querySelector('.popup_picture');
const pictureCloseButton = popupPicture.querySelector('.popup__close-but');
const popupImg = popupPicture.querySelector('.popup__img');
const popupDescription = popupPicture.querySelector('.popup__description');

// Открытие поп-апа
function openPopup(item) {
  item.classList.add('popup_opened');
}
// внесение формы профиля
function showPopupProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

// Закрытие поп-апа
function closePopup(item) {
  item.classList.remove('popup_opened');
}

// Отправка формы профиля
function handleFormSubmit (evt) {
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

// действие по кнопке Создать
function createCard(item) {
  const newCard = cardTemplate.cloneNode(true);
  const elementImg = newCard.querySelector('.element__pic');
  newCard.querySelector('.element__text').textContent = item.name;
  elementImg.alt = item.name;
  elementImg.src = item.link;
  const likeButton = newCard.querySelector('.element__like-button');
  likeButton.addEventListener("click", (evt) => setLike(evt));

  const buttonReset = newCard.querySelector('.element__trash');
  buttonReset.addEventListener("click", (evt) => resetCard(evt));

  elementImg.addEventListener('click', () => openPicture(item.name, item.link));
  return newCard;
};

// кнопка создать попап
formPlace.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const newCard = createCard({name: inputPlaceName.value, link: inputPlaceLink.value});
  elementsList.prepend(newCard);
  closePopup(popupPlace);
  evt.target.reset();
});


// Слушатели открытия-закрытия по-ап
profileEditButton.addEventListener('click', showPopupProfile); // открытие поп-ап профиля
profileAddButton.addEventListener('click',() => openPopup(popupPlace)); // открытие поп-ап галлереи
profileCloseButton.addEventListener('click',() => closePopup(popupProfile)); // закрытие поп-ап профиля
placeCloseButton.addEventListener('click',() => closePopup(popupPlace)); // закрытие поп-ап галереи
formElement.addEventListener('submit', handleFormSubmit); // отправка формы профиля
pictureCloseButton.addEventListener('click',() => closePopup(popupPicture)); // закрытие поп-ап галереи
