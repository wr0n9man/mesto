
import {
	selector,
	validationConfig,	
	popupGallery,
	popupProfile,
	buttonAddPlace,
	buttonEditProfile,
	popupImageOpen,	
   profileAvatar,
	profileHeading,
	profileJob,
	place,
	galleryContent,
	profileContent,
	nameInput,
	jobInput,
	popupDeleteImage,
	popupAvatar,
	avatarContent,
	buttonEditAvatar,
	avatarInput,
	content,
	spinner
} from '../utils/Constants.js';
import './page.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupDelete from '../components/PopupDelete.js';

function renderLoading(isLoading){
	if (isLoading){
	  spinner.classList.add('spinner_visible')
	  content.classList.add('content_hidden')
	}else{
		spinner.classList.remove('spinner_visible')
	  content.classList.remove('content_hidden')
	}
 }

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
	headers: {
	  authorization: 'a636e40b-41e2-4486-9487-73203d96297e',
	  'Content-Type': 'application/json'
	}
 });


const validFormGallery = new FormValidator(validationConfig, galleryContent);
const validFormProfile = new FormValidator(validationConfig, profileContent);
const validFormAvatar = new FormValidator(validationConfig, avatarContent);
const popupOpenPlace = new PopupWithImage(popupImageOpen);
const profileInfo = new UserInfo(profileHeading, profileJob, profileAvatar);


const popupEditAvatar = new PopupWithForm({
	popup:popupAvatar,
	submit: (data)=>{	
		avatarContent.querySelector('.popup__save-button').textContent='Сохранение...'	
		api.sendAvatar(data[0])
		.then((result)=>{
			profileInfo.setUserInfo(result);
		})
		.catch((err) => {
         console.log(err); // выведем ошибку в консоль
       }); 
		 avatarContent.querySelector('.popup__save-button').textContent='Сохранение'
	}
})

const popupEditUserProfile = new PopupWithForm({
	popup: popupProfile,
	submit: (data) => {
		profileContent.querySelector('.popup__save-button').textContent='Сохранение...'
		data={
			name: data[0],
			about: data[1]
      }
      api.sendUserInfo(data) .then((result) => {
         profileInfo.setUserInfo(result);
       })
       .catch((err) => {
         console.log(err); // выведем ошибку в консоль
       }); 
		 profileContent.querySelector('.popup__save-button').textContent='Сохранение'
	}
})

function createCard(item){
	const card = new Card(
		{
			data: item,
			handleCardClick: (item) => {
				popupOpenPlace.openPopup(item.name, item.link);
			}
		},
		selector,
		popupDeleteImage,
		PopupDelete,
		api);
		return card;
}

const galleryRender = new Section({
	renderer: (item) => {
		const card = createCard(item)
		const cardElement = card.generateCard();
		place.append(cardElement);
	}
},
	place
)



const popupCreatePlace = new PopupWithForm({
	popup: popupGallery,
	submit: (item) => {
		galleryContent.querySelector('.popup__save-button').textContent='Созданение...'
      api.sendPlace(item={name: item[0],
      link: item[1]})
      .then((result)=>{
         const card = createCard(result)
            const cardElement = card.generateCard();
            galleryRender.addItem(cardElement);
      })
      .catch((err) => {
         console.log(err); // выведем ошибку в консоль
		 }); 
		 galleryContent.querySelector('.popup__save-button').textContent='Создать'		
	}
})

renderLoading(true);

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
	renderLoading(false);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
 

validFormProfile.enableValidation();
validFormGallery.enableValidation();

// PopupDeletePlace.setEventListener();
popupOpenPlace.setEventListener();
popupEditUserProfile.setEventListener();
popupCreatePlace.setEventListener();
popupEditAvatar.setEventListener();
validFormAvatar.enableValidation();

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

	buttonEditAvatar.addEventListener('click',()=>{popupEditAvatar.open()
		validFormAvatar.chekButton();
		validFormAvatar.closeForm(); 
		avatarInput.value=profileInfo.getUserInfo().avatar;

	})
