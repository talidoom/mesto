export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        console.log(this);
    }
    open () {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('keyup', this._handleEscClose);
        this._popup.addEventListener("mousedown", this._handleOverlayClose);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('keyup', this._handleEscClose);
        this._popup.removeEventListener("mousedown", this._handleOverlayClose);
    }
    _handleOverlayClose (evt) {
        console.log('Enter to handle close');
        if(evt.target === evt.currentTarget){
            console.log('Evt  handle close triggered');
            this.close();
        }
      };
    _handleEscClose(evt) {
        console.log('Enter to handle close');
        evt.preventDefault();
        if(evt.key === 'Escape') {
            console.log('Evt  handle close triggered');
            this.close();
        }
    }
    setEventListeners() {
        const closeButton = this._popup.querySelector(".popup__close-but");
        closeButton.addEventListener("click", () => { 
            this.close();
        });

    }
}