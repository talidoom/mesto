export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._button = this._popup.querySelector(".form__button")
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleOverlayClose (evt) {
        if(evt.target === evt.currentTarget){
            this.close();
        }
    }

    _handleEscClose(evt) {
        evt.preventDefault();
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    renderLoading(loading) {
        // if (loading) {
        //   this._button.value = "Сохранение..."
        // } else {
        //   this._button.value = "Сохранить"
        // }
        if (loading) {
            this._button.textContent = "Сохранение..."
          } else {
            this._button.textContent = "Сохранить"
          }
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-but')) {
                this.close();
            }
        });
    }
}