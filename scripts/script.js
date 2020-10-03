

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
let profile = document.querySelector('.profile__redact');
let buttonoOpenPopup = document.querySelector('.profile__edit-button')
let buttonoClosePopup = document.querySelector('.popup__close-image')
let buttonoSavePopup = document.querySelector('.popup__save-button')
let popup = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__item_value_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__item_value_job');// Воспользуйтесь инструментом .querySelector()
let profileHeading = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__about');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function popupToggle() {
	popup.classList.toggle('popup_is-opened')

	if (popup.classList.contains('popup_is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
}

buttonoOpenPopup.addEventListener('click', popupToggle);
buttonoClosePopup.addEventListener('click', popupToggle);


function formSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM


	// Получите значение полей из свойства value

	// Выберите элементы, куда должны быть вставлены значения полей

	// Вставьте новые значения с помощью textContent
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 