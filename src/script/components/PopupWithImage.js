import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popup.querySelector('.popup__img');
        this._popupDescription = this._popup.querySelector('.popup__description');
        this.setEventListeners();
    }
    
    openPic (name, link) {
        this._popupImg.alt = name;
        this._popupImg.src = link;
        this._popupDescription.textContent = name;
        console.log(name,link);
        super.open();
    }
}
