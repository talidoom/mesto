export default class FormValidation {
  constructor(config, form) {
    this._config = config;
    this._form = form;
    this._submitButton = this._form.querySelector(config.buttonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
  }
  enableValidation() {
    this._form.addEventListener('submit', (evt) => evt.preventDefault());
    this._setInputListeners();
  };
  _setInputListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () =>{
        if(input.checkValidity()) {
          this._resetError(input);
        } else {
          this._activateError(input);
        }
        this._toggleButtonState();
      })
      this._toggleButtonState();
    });
  }
  _resetError (input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.classList.remove(this._config.errorTextClass);
    input.classList.remove(this._config.inputErrorClass);
  };
  
  _activateError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    error.classList.add(this._config.errorTextClass);
    error.textContent = input.validationMessage;
    input.classList.add(this._config.inputErrorClass);
  };
  resetValidition() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      this._resetError(input);
    });
  };
  _toggleButtonState () {
    this._submitButton.disabled = !this._form.checkValidity();
  };
};
