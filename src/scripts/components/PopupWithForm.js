import popup from "./popup.js"

export default class popupWithForm extends popup {
	constructor(popup, submit, validationForm) {
		super(popup);
		this.submit = submit;
		this.validationForm = validationForm;
	}
	openPopup() {
		validationForm.chekButton();
		validationForm.closeForm();
		super.openPopup();
	}

	closePopup() {
		this._popup.querySelectorAll('.popup__input').map((item) => item.value = '');
		super.closePopup();
	}

	_getInputValues() {
		const inputValue = Array.from(this._popup.querySelectorAll('.popup__input')).map(item => item.value)
	}

	setEventListeners() {
		this._popup.addEventListener('submit',);
		super.setEventListeners();
	}

}