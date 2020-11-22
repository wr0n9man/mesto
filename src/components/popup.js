
export default class Popup {

	// в es 6 так ведь можно делать
	constructor(popup) {
		this._popup = popup;
		this.closePopup = this.closePopup.bind(this);
		this._closePopupByEsc = this._closePopupByEsc.bind(this);
		this._overlay = null;
	}

	_getOverlay() {
		this._overlay = this._popup.querySelector('.popup__overlay');
		return this._overlay;
	}

	_closePopupByEsc(e) {
		if (e.key === 'Escape') {
			this.closePopup();
		}
	}

	closePopup() {
		this._popup.classList.remove('popup__is-opened');
		document.removeEventListener('keydown', this._closePopupByEsc);
		this._overlay.removeEventListener('click', this.closePopup);

	}

	openPopup() {

		this._getOverlay();
		this.setEventListener();
		this._popup.classList.add('popup__is-opened');
		this._overlay.classList.add('popup__overlay_active');
		this._overlay.addEventListener('click', this.closePopup);
		document.addEventListener('keydown', this._closePopupByEsc);
	}

	setEventListener() {
		this._popup.querySelector('.popup__close-image').addEventListener('click', this.closePopup)
	}
}