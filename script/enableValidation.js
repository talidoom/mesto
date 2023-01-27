const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  buttonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error',
  errorTextClass: 'form__input-error_active',
};

// функция добавления класса ошибки
function activateError(input, form, config) {
  const error = form.querySelector(`#${input.name}-error`);
  error.classList.add(config.errorTextClass);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass);
};

// функция удаления класса ошибки
function resetError (input, form, config) {
  const error = form.querySelector(`#${input.name}-error`);
  error.classList.remove(config.errorTextClass);
  input.classList.remove(config.inputErrorClass);
};

// функция проверки валидности
function setInputListeners (form, config) {
  const submitButton = form.querySelector(config.buttonSelector);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function(input){
    input.addEventListener('input', (evt) =>{
      if(input.checkValidity()) {
        resetError(input, form, config);
      } else {
        activateError(input, form, config);
        evt.preventDefault();
      }
      toggleButtonState(inputList, submitButton);
    })
    toggleButtonState(inputList, submitButton);
  })
};

// функция вызова проверки валидности
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (form) {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setInputListeners(form, config);
  })
};
enableValidation(validationConfig);

// функция чтобы не отображалась ошибки при повторном открытии окна
function resetValidition (form, config) {
  const submitButton = form.querySelector(config.buttonSelector);
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(function (input){
    resetError(input, form, config);
    toggleButtonState(inputList, submitButton);
  })
};

// функции для кнопки
function checkInputValidity (inputs) {
  return inputs.some(input => !input.checkValidity())
};

function toggleButtonState (inputs, button) {
  if (checkInputValidity(inputs)) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
};
