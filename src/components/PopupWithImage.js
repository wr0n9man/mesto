import Popup from "./popup.js"

export default class popupWithImage extends Popup {
	constructor(Popup) { super(Popup) }
	openPopup(name, link) {		
		this._popup.querySelector('.popup__image').querySelector('.popup__name').textContent = name;
		this._popup.querySelector('.popup__photo').alt = name;
		this._popup.querySelector('.popup__photo').src = link;
		super.open()
	}
}