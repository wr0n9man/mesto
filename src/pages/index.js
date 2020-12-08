
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

function renderLoading(popup,isLoading){
	if (isLoading){
		popup.querySelector('.popup__save-button').textContent='Сохранение...'	
	}else{
		popup.querySelector('.popup__save-button').textContent='Сохранение'
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
const popupDeletePlace = new PopupDelete(popupDeleteImage,api)	

const popupEditAvatar = new PopupWithForm({
	popup:popupAvatar,
	submit: (data)=>{		
		api.sendAvatar(data)
		.then((result)=>{
			renderLoading(avatarContent,true)
			profileInfo.setUserInfo(result);
			popupEditAvatar.close(); 
		})
		.catch((err) => {
         console.log(err); // выведем ошибку в консоль
       }); 
		 renderLoading(avatarContent,false)
	}
})

const popupEditUserProfile = new PopupWithForm({
	popup: popupProfile,
	submit: (data) => {
		renderLoading(profileContent,true)		
		api.sendUserInfo(data) .then((result) => {
			profileInfo.setUserInfo(result);
			popupEditUserProfile.close(); 
       })
       .catch((err) => {
         console.log(err); // выведем ошибку в консоль
       }); 
		 renderLoading(profileContent,false)	
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
		popupDeletePlace,
		api);
		return card;
}

const galleryRender = new Section({
	renderer: (item) => {
		const card = createCard(item)
		const cardElement = card.generateCard();
		galleryRender.addItem(cardElement, true);	
	}
},
	place
)



const popupCreatePlace = new PopupWithForm({
	popup: popupGallery,
	submit: (item) => {
		renderLoading(galleryContent,true)	
      api.sendPlace(item)
      .then((result)=>{
         const card = createCard(result)
            const cardElement = card.generateCard();
				galleryRender.addItem(cardElement,false);
				popupCreatePlace.close(); 
      })
      .catch((err) => {
         console.log(err); // выведем ошибку в консоль
		 });
		 renderLoading(galleryContent,false)	
				
	}
})





  Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
	api.getInfoUser(),
	api.getInitialCards()
])    
.then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
	const [userData, initialCards] = values;
	profileInfo.setUserInfo(userData);
	galleryRender.renderItems(initialCards);
	
})
.catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
	console.log(err);
})


validFormProfile.enableValidation();
validFormGallery.enableValidation();

popupDeletePlace.setEventListener();	
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
