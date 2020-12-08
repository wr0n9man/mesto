
export default class Popup {

	// в es 6 так ведь можно делать
	constructor(popup) {
		this._popup = popup;
		this.close = this.close.bind(this);
		this._closeByEsc = this._closeByEsc.bind(this);
		this._overlay = null;
	}

	_getOverlay() {
		this._overlay = this._popup.querySelector('.popup__overlay');
		return this._overlay;
	}

	_closeByEsc(e) {
		if (e.key === 'Escape') {
			this.close();
		}
	}

	close() {
		this._popup.classList.remove('popup__is-opened');
		document.removeEventListener('keydown', this._closeByEsc);
		// this._overlay.removeEventListener('click', this.close);

	}

	open() {
		this._getOverlay();
		this._popup.classList.add('popup__is-opened');
		this._overlay.classList.add('popup__overlay_active');
		
		document.addEventListener('keydown', this._closeByEsc);
	}

	setEventListener() {
		this._getOverlay();
		this._overlay.addEventListener('click', this.close);
		this._popup.querySelector('.popup__close-image').addEventListener('click', this.close)
	}
}