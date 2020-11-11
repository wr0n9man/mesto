import { validationConfig } from './constants.js';
import { Card } from './card.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './popup.js'

// принимает вторым параметром элемент той формы, которая валидируется не особо понял этот пункт

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

const popupGallery = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup__image');

const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonCloseProfile = popupProfile.querySelector('.popup__close-image')
const buttonCloseGallery = popupGallery.querySelector('.popup__close-image');
const buttonClosePlace = popupPlace.querySelector('.popup__close-image');
const popupImageOpen = document.querySelector('.popup_type_image');

const nameInput = document.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('#job-input');// Воспользуйтесь инструментом .querySelector()

const profileHeading = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const galleryNameInput = document.querySelector('#place-input');
const galleryLinkInput = document.querySelector('#link-input');
const place = document.querySelector('.places')


const validFormGallery = new FormValidator(validationConfig, popupGallery.querySelector('.popup__content'));
const validFormProfile = new FormValidator(validationConfig, popupProfile.querySelector('.popup__content'));
export const popupImage = document.querySelector('.popup__image');
export const photo = popupImage.querySelector('.popup__photo')

const createCard = (item) => {
	const card = new Card(item.name, item.link, '.place');
	const cardElement = card.generateCard();
	place.prepend(cardElement);
}

initialCards.forEach(evt => createCard(evt));

// export function togglePopup(popup) {
// 	const closePopupHandler = () => {
// 		popup.classList.remove('popup__is-opened');
// 		document.removeEventListener('keydown', closePopupByEsc);
// 		overlay.removeEventListener('click', closePopupHandler);
// 	}
// 	function closePopupByEsc(e) {
// 		if (e.key === 'Escape') {
// 			closePopupHandler();
// 		}
// 	}
// 	const overlay = popup.querySelector('.popup__overlay')
// 	if (popup.classList.contains('popup__is-opened')) {
// 		closePopupHandler();
// 	} else {
// 		popup.classList.add('popup__is-opened');
// 		overlay.classList.add('popup__overlay_active');
// 		overlay.addEventListener('click', closePopupHandler);
// 		document.addEventListener('keydown', closePopupByEsc);
// 	}
// }

validFormProfile.enableValidation();
validFormGallery.enableValidation();



const popupRedactProfile = new Popup(popupProfile);
const popupCreatePlace = new Popup(popupGallery);
export const popupOpenPlace = new Popup(popupImageOpen);

const toggleAddCardPopup = () => {
	popupCreatePlace.openPopup();

	galleryNameInput.value = '';
	galleryLinkInput.value = '';
	validFormGallery.chekButton()
	validFormGallery.closeForm();
}


const toggleEditProfile = () => {
	popupRedactProfile.openPopup();
	if (popupProfile.classList.contains('popup__is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}


	validFormProfile.chekButton()
	validFormProfile.closeForm();
}

buttonEditProfile.addEventListener('click', toggleEditProfile);
buttonAddPlace.addEventListener('click', toggleAddCardPopup);
popupGallery.addEventListener('submit', () => addCardToGallery())

buttonCloseProfile.addEventListener('click', () => { popupRedactProfile.closePopup() });

buttonCloseGallery.addEventListener('click', () => { popupCreatePlace.closePopup() });

buttonClosePlace.addEventListener('click', () => { popupOpenPlace.closePopup() });

function submitEditProfileForm(evt) {
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	popupRedactProfile.closePopup();
}

popupProfile.addEventListener('submit', submitEditProfileForm);

const addCardToGallery = () => {
	createCard({
		name: galleryNameInput.value,
		link: galleryLinkInput.value
	});
	popupCreatePlace.closePopup()

}