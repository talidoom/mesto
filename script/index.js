const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-but');

// функция для открытия попапа
profileEditButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
});

// функция для закрытия попапа
popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});
popup.addEventListener('click', function(evt) {
    if(evt.target === evt.currentTarget) {
        popup.classList.remove('popup_opened');
    }
});


const formElement = popup.querySelector('.form');
const nameInput = formElement.querySelector('.form__text_name');
const jobInput = formElement.querySelector('.form__text_job');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

// автозаполнение формы из профиля
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;


// функция обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

// срабатывание обработчика по кнопке
formElement.addEventListener('submit', handleFormSubmit);

