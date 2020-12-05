import Popup from "./Popup.js";



export default class PopupWithForm extends Popup {
	constructor({ popup, submit } ) {
		super(popup);
		this._submit = submit;		
		this._submitForm = this._submitForm.bind(this)
	}

	close() {
		this._popup.querySelector('.popup__content').reset();
		this._popup.removeEventListener('submit', this.submitForm);
		super.close();
	}

	_getInputValues() {
		const inputValue = Array.from(this._popup.querySelectorAll('.popup__input')).map((item) => item.value); 	
		return inputValue;
	}

	_submitForm() {
		this._submit(this._getInputValues());
		this.close();
	}

	setEventListener() {
		this._popup.addEventListener('submit', this._submitForm);
		super.setEventListener();
	}
}