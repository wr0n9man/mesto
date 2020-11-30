import Popup from "./popup.js"

export default class PopupWithImage extends Popup {
	constructor(Popup) { super(Popup) }
	openPopup(name, link) {	
      const photo= this._popup.querySelector('.popup__photo')	
		this._popup.querySelector('.popup__image').querySelector('.popup__name').textContent = name;
      photo.alt = name;
		photo.src = link;
		super.open()
	}
}