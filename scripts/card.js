import { photo, popupOpenPlace } from './script.js'
const popupPreview = document.querySelector('.popup__image').querySelector('.popup__name')

export class Card {

	constructor(name, link, itemSelector) {
		this._name = name;
		this._link = link;
		this._itemSelector = itemSelector;
	}

	_getTemplate() {
		const place = document.querySelector('#place').content.querySelector(this._itemSelector).cloneNode(true);

		return place;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._nameCard = this._element.querySelector('.place__name')
		this._image = this._element.querySelector('.place__image');
		this._setEventListeners();
		this._nameCard.innerText = this._name;
		this._image.src = this._link;
		this._image.alt = this._name;
		return this._element;
	}
	_handleLikeIcon = () => {

		this._element.querySelector('.place__like').classList.toggle('place__like_active');
		//изменяет иконку лайка
	};

	_handleDeleteCard = () => {
		this._element.remove();
		this._element = null;
		//удаляет карточку
	};

	_handlePreviewPicture = () => {
		popupPreview.textContent = this._name;
		photo.alt = this._name;
		photo.src = this._link;
		popupOpenPlace.openPopup();
	}

	_setEventListeners() {
		this._element.querySelector('.place__image').addEventListener('click', () => {
			this._handlePreviewPicture();
		});
		this._element.querySelector('.place__delete').addEventListener('click', () => {
			this._handleDeleteCard();
		});
		this._element.querySelector('.place__like').addEventListener('click', () => {
			this._handleLikeIcon();
		});
	}
}
