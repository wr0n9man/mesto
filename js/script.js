

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
let profile = document.querySelector('.profile__redact');
let buttonoOpenPopup = document.querySelector('.profile__Edit-button')
let buttonoClosePopup = document.querySelector('.popup__close-image')
let buttonoSavePopup = document.querySelector('.popup__Save-button')
let popup = document.querySelector('.popup');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function popupToggle() {
	popup.classList.toggle('popup_is-opened')

}

buttonoOpenPopup.addEventListener('click', popupToggle);
buttonoClosePopup.addEventListener('click', popupToggle);


function formSubmitHandler(evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
	// Так мы можем определить свою логику отправки.
	// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM
	let nameInput = formElement.querySelector('.popup__item_name'); // Воспользуйтесь инструментом .querySelector()
	let jobInput = formElement.querySelector('.popup__item_job');// Воспользуйтесь инструментом .querySelector()

	// Получите значение полей из свойства value

	// Выберите элементы, куда должны быть вставлены значения полей
	let profile__heading = profile.querySelector('h2');
	let profile__job = profile.querySelector('p');
	// Вставьте новые значения с помощью textContent
	profile__heading.textContent = `${nameInput.value}`;
	profile__job.textContent = `${jobInput.value}`;
	popupToggle();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 