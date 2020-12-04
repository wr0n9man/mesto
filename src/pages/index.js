
import {
	selector,
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
	galleryContent,
	profileContent,
	nameInput,
	jobInput
} from '../utils/Constants.js';
import './page.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
	headers: {
	  authorization: 'a636e40b-41e2-4486-9487-73203d96297e',
	  'Content-Type': 'application/json'
	}
 });


const validFormGallery = new FormValidator(validationConfig, galleryContent);
const validFormProfile = new FormValidator(validationConfig, profileContent);
const popupOpenPlace = new PopupWithImage(popupImageOpen);
const profileInfo = new UserInfo(profileHeading, profileJob);

const popupEditUserProfile = new PopupWithForm({
	popup: popupProfile,
	submit: (data) => {
		data={
			name: data[0],
			about: data[1]
		}
		profileInfo.setUserInfo(data);
	}
})

function createCard(item){
	const card = new Card(
		{
			data: item,
			handleCardClick: (item) => {
				popupOpenPlace.openPopup(item.name, item.dop);
			}
		},
		selector);
		return card;
}

const galleryRender = new Section({
	renderer: (item) => {
		const card = createCard(item)
		const cardElement = card.generateCard();
		place.prepend(cardElement);
	}
},
	place
)



const popupCreatePlace = new PopupWithForm({
	popup: popupGallery,
	submit: (item) => {
		const card = createCard(item={name: item[0],
		link: item[1]})
		const cardElement = card.generateCard();
		galleryRender.addItem(cardElement);
	}
})


api.getInfoUser()
.then((result) => {
	profileInfo.setUserInfo(result)
 })
 .catch((err) => {
	console.log(err); // выведем ошибку в консоль
 });

 api.getInitialCards()
  .then((result) => {
	galleryRender.renderItems(result);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 


validFormProfile.enableValidation();
validFormGallery.enableValidation();

popupOpenPlace.setEventListener();
popupEditUserProfile.setEventListener();
popupCreatePlace.setEventListener();

buttonEditProfile.addEventListener('click', () =>{ 
	popupEditUserProfile.open();
	validFormProfile.chekButton(); 
	validFormProfile.closeForm(); 	
	nameInput.value= profileInfo.getUserInfo().name;
	jobInput.value= profileInfo.getUserInfo().about;

});

buttonAddPlace.addEventListener('click', () =>{ popupCreatePlace.open();
	validFormGallery.chekButton(); 
	validFormGallery.closeForm(); });


