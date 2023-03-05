export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
    }
    open () {
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
      };
    _handleEscClose(evt) {
        evt.preventDefault();
        if(evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close-but");
        closeButton.addEventListener("click", () => { 
            this.close();
        });
        this._popup.addEventListener("mousedown", this._handleOverlayClose);
    }
}