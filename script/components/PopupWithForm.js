import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector)
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll(".form__input");
        this._submitForm = submitForm;
        this.setEventListeners();
    }
    _getInputValues() {
        const inputData = {};
        this._inputList.forEach(input => inputData[input.name] = input.value);
        return inputData;
    }
    setEventListeners(evt) {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close();
          });
          super.setEventListeners();
    }
    close() {
        super.close();
        this._form.reset();
      }
}