import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.formSubmit();
        });
    }

    setFormSubmit(submitHandler) {
        this.formSubmit = submitHandler;
    }
}