const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-but');

const formElement = popup.querySelector('.form');
const nameInput = formElement.querySelector('.form__text_type_name');
const jobInput = formElement.querySelector('.form__text_type_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');


// функция для открытия попапа
function popupShow(evt) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    popup.classList.add('popup_opened');
}
profileEditButton.addEventListener('click', popupShow);

// функция для закрытия попапа
function popupClose () {
    // автозаполнение формы из профиля
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    // открытие окна
    popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popupClose);

// функция отправки формы
function handleFormSubmit (evt) {
    evt.preventDefault();
  // заполнение профиля из формы
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  // закрытие попапа
    popup.classList.remove('popup_opened');
}
// срабатывание обработчика по кнопке
formElement.addEventListener('submit', handleFormSubmit);

