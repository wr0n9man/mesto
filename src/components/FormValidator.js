export class FormValidator {
	constructor(validationConfig, form) {
		this._formSelector = validationConfig.formSelector;
		this._inputSelector = validationConfig.inputSelector;
		this._submitButtonSelector = validationConfig.submitButtonSelector;
		this._inactiveButtonClass = validationConfig.inactiveButtonClass;
		this._inputErrorClass = validationConfig.inputErrorClass;
		this._errorClass = validationConfig.errorClass;
		this._form = form;
	}

	_hasInvalidInput(inputList) {
		return inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_showError(inputElement, ErrorMessage) {
		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.add(this._inputErrorClass);
		errorElement.textContent = ErrorMessage;
		errorElement.classList.add(this._errorClass);
	};

	_hideError(inputElement) {

		const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
		inputElement.classList.remove(this._inputErrorClass);
		errorElement.classList.remove(this._errorClass);
		errorElement.textContent = '';
	};

	_checkInputValidity(inputElement) {

		if (!inputElement.validity.valid) {
			this._showError(inputElement, inputElement.validationMessage);
		} else {
			this._hideError(inputElement);
		}
	};

	_toggleButtonState(inputList, buttonElement) {
		if (this._hasInvalidInput(inputList)) {
			buttonElement.classList.add(this._inactiveButtonClass);
			buttonElement.disabled = "true";
		} else {
			buttonElement.classList.remove(this._inactiveButtonClass);
			buttonElement.disabled = "";
		}
	}
	chekButton() {
		const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
		const buttonElement = this._form.querySelector(this._submitButtonSelector);
		this._toggleButtonState(inputList, buttonElement);
		inputList.push(buttonElement);
		return inputList;
	}

	enableValidation() {

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		this._setEventListeners();
	};
	_setEventListeners() {
		const inputList = this.chekButton();
		const buttonElement = inputList.pop();

		inputList.forEach((inputElement) => {

			inputElement.addEventListener('input', () => {

				this._checkInputValidity(inputElement);
				this._toggleButtonState(inputList, buttonElement);
			})
		})
	}
	closeForm() {
		const inputList = Array.from(this._form.querySelectorAll('.popup__input'));

		inputList.forEach((inputElement) => {
			this._hideError(inputElement);
		})
	}
}
