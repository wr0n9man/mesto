import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
	constructor(Popup) { super(Popup) 
		this._photo= this._popup.querySelector('.popup__photo')	}
	openPopup(name, link) {	     
		this._popup.querySelector('.popup__image').querySelector('.popup__name').textContent = name;
      this._photo.alt = name;
		this._photo.src = link;
		super.open()
	}
}