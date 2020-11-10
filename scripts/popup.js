export class Popup {
	_overlay = null;
	constructor(popup) {
		this._popup = popup;
		this.closePopup = this.closePopup.bind(this);
		this.closePopupByEsc = this.closePopupByEsc.bind(this);
	}

	_getOverlay() {
		this._overlay = this._popup.querySelector('.popup__overlay');
		return this._overlay;
	}

	closePopupByEsc(e) {
		if (e.key === 'Escape') {
			this.closePopup();
		}
	}

	closePopup() {

		this._popup.classList.remove('popup__is-opened');
		document.removeEventListener('keydown', this.closePopupByEsc);
		this._overlay.removeEventListener('click', this.closePopup);
	}

	openPopup() {

		this._getOverlay();
		this._popup.classList.add('popup__is-opened');
		this._overlay.classList.add('popup__overlay_active');
		this._overlay.addEventListener('click', this.closePopup);
		document.addEventListener('keydown', this.closePopupByEsc);
	}


}