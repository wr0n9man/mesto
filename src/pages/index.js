
import {
	validationConfig,
	initialCards,
	popupGallery,
	popupProfile,
	buttonAddPlace,
	buttonEditProfile,
	popupImageOpen,
	profileHeading,
	profileJob,
	place,

} from '../utils/constants.js';
import './page.css';
import { Card } from '../components/card.js';
import { FormValidator } from '../components/FormValidator.js';
import popupWithForm from '../components/PopupWithForm.js';
import popupWithImage from '../components/PopupWithImage.js';
import Section from '../components/section.js';
import UseerInfo from '../components/UserInfo.js';


const validFormGallery = new FormValidator(validationConfig, popupGallery.querySelector('.popup__content'));
const validFormProfile = new FormValidator(validationConfig, popupProfile.querySelector('.popup__content'));
export const popupOpenPlace = new popupWithImage(popupImageOpen);
const profileInfo = new UseerInfo(profileHeading, profileJob);
const popupRedactProfile = new popupWithForm({
	popup: popupProfile,
	submit: (data) => {
		profileInfo.setUserInfo(data);
	}
}, validFormProfile)

const galleryRender = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = new Card(
			{
				data: item,
				handleCardClick: (item) => {
					popupOpenPlace.openPopup(item.name, item.dop);
				}
			},
			'.place');
		const cardElement = card.generateCard();
		place.prepend(cardElement);
	}
},
	place
)
galleryRender.renderItems();


const popupCreatePlace = new popupWithForm({
	popup: popupGallery,
	submit: (item) => {
		const card = new Card(
			{
				data: item,
				handleCardClick: (item) => {
					popupOpenPlace.openPopup(item.name, item.link);
				}
			},
			'.place');
		const cardElement = card.generateCard();
		galleryRender.addItem(cardElement);
	}
}, validFormGallery)

validFormProfile.enableValidation();
validFormGallery.enableValidation();

buttonEditProfile.addEventListener('click', () => popupRedactProfile.openPopup(profileInfo.getUserInfo()));
buttonAddPlace.addEventListener('click', () => popupCreatePlace.openPopup());
