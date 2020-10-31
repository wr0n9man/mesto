const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
}

const toggleButtonState = (inputList, buttonElement, form) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(form.inactiveButtonClass);
		buttonElement.disabled = "true";
	} else {
		buttonElement.classList.remove(form.inactiveButtonClass);
		buttonElement.disabled = "";
	}
}

const showError = (formElement, inputElement, ErrorMessage, form) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(form.inputErrorClass);
	errorElement.textContent = ErrorMessage;
	errorElement.classList.add(form.errorClass);
};

const hideError = (formElement, inputElement, form) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(form.inputErrorClass);
	errorElement.classList.remove(form.errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, form) => {
	if (!inputElement.validity.valid) {
		showError(formElement, inputElement, inputElement.validationMessage, form);
	} else {
		hideError(formElement, inputElement, form);
	}
};

const setEventListeners = (formElement, form) => {
	const inputList = chekButton(formElement, form);
	const buttonElement = inputList.pop();
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement, form);
			toggleButtonState(inputList, buttonElement, form);
		})
	})
}

const enableValidation = (form) => {
	const formList = Array.from(document.querySelectorAll(form.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});
		setEventListeners(formElement, form,);
	});
}

const closeForm = (data, form) => {
	const inputList = Array.from(data.querySelectorAll('.popup__input'));
	inputList.forEach((inputElement) => {
		hideError(data, inputElement, form);
	})
}

function chekButton(formElement, form) {
	const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
	const buttonElement = formElement.querySelector(form.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, form);
	inputList.push(buttonElement);
	return inputList;
}

enableValidation(mestoValid);
