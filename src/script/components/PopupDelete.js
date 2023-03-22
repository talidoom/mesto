import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
    }
    
    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.formSubmit();
        });
    }

    setFormSubmit(token) {
        this.formSubmit = token;
    }
}