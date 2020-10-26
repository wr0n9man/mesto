const form = document.querySelector('.popup__content');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
}

const toggleButtonState = (inputList, buttonElement) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add('popup__save-button_inactive');
		buttonElement.disabled = "true";
	} else {
		buttonElement.classList.remove('popup__save-button_inactive');
		buttonElement.disabled = "";
	}
}

const showError = (formElement, inputElement, ErrorMessage) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add('popup__input_type_error');
	errorElement.textContent = ErrorMessage;
	errorElement.classList.add('popup__input-error_active');
};

const hideError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove('popup__input_type_error');
	errorElement.classList.remove('popup__input-error_active');
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		showError(formElement, inputElement, inputElement.validationMessage);
	} else {
		hideError(formElement, inputElement);
	}
};

const setEventListeners = (formElement) => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save-button');
	toggleButtonState(inputList, buttonElement);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
		})
	})
}

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__content'));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(formElement);
	});
}

const closeForm = (data) => {
	const inputList = Array.from(data.querySelectorAll('.popup__input'));
	inputList.forEach((inputElement) => {
		hideError(data, inputElement);
	})
}

buttonCloseGallery.addEventListener('click', () => { closeForm(formGallery) });

buttonCloseProfile.addEventListener('click', () => { closeForm(formProfile) });

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
}); 
