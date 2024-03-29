import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._form = this._popup.querySelector('.form');
        this._inputList = this._form.querySelectorAll(".form__input");
        this._handleFormSubmit = handleFormSubmit;
        this._button = this._popup.querySelector(".form__button");
    }
 
    _getInputValues() {
        this._formValues  = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          });
    }

    renderLoading(loading) {
        if (loading) {
            this._button.textContent = "Сохранение..."
          } else {
            this._button.textContent = "Сохранить"
          }
    }

    close() {
        super.close();
        this._form.reset();
      }
}