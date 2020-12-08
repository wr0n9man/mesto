import Popup from "./Popup.js";



export default class PopupWithForm extends Popup {
	constructor({ popup, submit } ) {
		super(popup);
		this._submit = submit;		
		
		this._submitForm = this._submitForm.bind(this)
		this._formValues={};
	}

	close() {
		this._popup.querySelector('.popup__content').reset();
		this._popup.removeEventListener('submit', this.submitForm);
		super.close();
	}

	_getInputValues() {
		this._inputList = this._popup.querySelectorAll('.popup__input');
		
		this._inputList.forEach(input => this._formValues[input.name] = input.value);		 	
		console.log(this._formValues  )
		return this._formValues;
	}

	_submitForm() {
		this._submit(this._getInputValues());		
	}

	setEventListener() {
		this._popup.addEventListener('submit', this._submitForm);
		super.setEventListener();
	}
}