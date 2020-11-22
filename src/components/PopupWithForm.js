import popup from "./popup.js";
import { nameInput, jobInput, popupProfile } from "../utils/constants.js"


export default class popupWithForm extends popup {
	constructor({ popup, submit }, validationForm) {
		super(popup);
		this.submit = submit;
		this._validationForm = validationForm;
		this.submitForm = this.submitForm.bind(this)
	}
	openPopup(data) {
		if (this._popup === popupProfile) {
			nameInput.value = data[0];
			jobInput.value = data[1];
		}
		this._validationForm.chekButton();
		this._validationForm.closeForm();
		this.setEventListeners();
		super.openPopup();
	}

	closePopup() {
		Array.from(this._popup.querySelectorAll('.popup__input')).map((item) => item.value = '');
		this._popup.removeEventListener('submit', this.submitForm);
		super.closePopup();
	}

	_getInputValues() {
		const inputValue = {
			name: Array.from(this._popup.querySelectorAll('.popup__input'))[0].value,
			dop: Array.from(this._popup.querySelectorAll('.popup__input'))[1].value
		}
			;

		// this.submit(inputValue);
		// this.closePopup();
		return inputValue;
	}

	submitForm() {
		this.submit(this._getInputValues());
		this.closePopup();

	}

	setEventListeners() {
		this._popup.addEventListener('submit', this.submitForm);

	}
}