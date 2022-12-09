const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const profileEditButton = content.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close-but');

profileEditButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});
popup.addEventListener('click', function(evt) {
    if(evt.target === evt.currentTarget) {
        popup.classList.remove('popup_opened');
    }
});
