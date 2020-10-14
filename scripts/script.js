const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const gallery = document.querySelector('.places');
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
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	popupToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

const Rendergallery = () => {
	const items = initialCards.map(Element => {
		return `<div class="place">
					<img src="${Element.link}" alt="Карачевск" class="place__image">
					<div class="place__main">
						<h3 class="place__name">${Element.name}</h3>
						<button type="button" class="place__like"></button>
					</div>
				</div>`;
	}).join('');
	gallery.insertAdjacentHTML("afterbegin", items);
}

Rendergallery();