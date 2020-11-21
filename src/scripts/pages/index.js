import {
	validationConfig,
	initialCards,
	popupGallery,
	popupProfile,
	buttonAddPlace,
	buttonEditProfile,
	popupImageOpen,
	nameInput,
	jobInput,
	profileHeading,
	profileJob,
	galleryNameInput,
	galleryLinkInput,
	place,

} from '../utils/constants.js';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import Popup from '../components/popup.js';
import popupWithForm from '../components/PopupWithForm.js';
import popupWithImage from '../components/PopupWithImage.js';
import Section from '../components/section.js';
// принимает вторым параметром элемент той формы, которая валидируется не особо понял этот пункт

const validFormGallery = new FormValidator(validationConfig, popupGallery.querySelector('.popup__content'));
const validFormProfile = new FormValidator(validationConfig, popupProfile.querySelector('.popup__content'));

const popupRedactProfile = new Popup(popupProfile);
const popupCreatePlace = new Popup(popupGallery);
export const popupOpenPlace = new popupWithImage(popupImageOpen);

const ewqe = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = new Card(
			{
				data: item,
				handleCardClick: (item) => {
					console.log(item)
					item.addEventListener('click', () => {

						popupOpenPlace.openPopup(item.name, item.link);
					});
				}
			},
			'.place');
		const cardElement = card.generateCard();
		place.prepend(cardElement);
	}
},
	place
)
ewqe.renderItems();

// const createCard = (item) => {
// 	const card = new Card(item.name, item.link, '.place');
// 	const cardElement = card.generateCard();
// 	place.prepend(cardElement);
// }

// initialCards.forEach(evt => createCard(evt));
validFormProfile.enableValidation();
validFormGallery.enableValidation();

const openAddCardPopup = () => {
	popupCreatePlace.openPopup();
	galleryNameInput.value = '';
	galleryLinkInput.value = '';
	validFormGallery.chekButton()
	validFormGallery.closeForm();
}

const openEditProfile = () => {
	popupRedactProfile.openPopup();
	if (popupProfile.classList.contains('popup__is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
	validFormProfile.chekButton()
	// она ведь вызывается и так 1 раз при открытии , а закрытие делается просто вызовом функции из класса popup  popupOpenPlace.closePopup()
	validFormProfile.closeForm();
}

buttonEditProfile.addEventListener('click', openEditProfile);
buttonAddPlace.addEventListener('click', openAddCardPopup);
popupGallery.addEventListener('submit', () => addCardToGallery())
popupProfile.addEventListener('submit', submitEditProfileForm);

function submitEditProfileForm(evt) {
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	popupRedactProfile.closePopup();
}

const addCardToGallery = () => {
	ewqe.addItem({
		name: galleryNameInput.value,
		link: galleryLinkInput.value
	});
	popupCreatePlace.closePopup()
}