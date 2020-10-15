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
const galleryTemplate = document.querySelector('#place');
const PopupGallery = document.querySelector('#gallery');
const PopupProfile = document.querySelector('#profile');
const buttonAddPlace = document.querySelector('.profile__add-button');
const PopupPlace = document.querySelector('.popup__image');
const PopupPlaceName = PopupPlace.querySelector('.popup__name');
const PopupPlaceImage = PopupPlace.querySelector('.popup__foto');



// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
let buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonCloseProfile = PopupProfile.querySelector('.popup__close-image')
const buttonCloseGallery = PopupGallery.querySelector('.popup__close-image');
const buttonClosePlace = PopupPlace.querySelector('.popup__close-image');
let popup = document.querySelector('.popup');
let nameInput = document.querySelector('.popup__item_value_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__item_value_job');// Воспользуйтесь инструментом .querySelector()
let profileHeading = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__about');
let galleryNameInput = document.querySelector('.popup__item_value_mesto');
let galleryLinkInput = document.querySelector('.popup__item_value_link');
const galleryAdd = document.querySelector('.popup__save-button_gallery');


function popupToggle() {
	popup.classList.toggle('popup_is-opened')
}

const profileEdit = () => {
	PopupProfile.classList.toggle('popup__container_profile')
	popupToggle();
	if (popup.classList.contains('popup_is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
}

const AddPlace = () => {
	PopupGallery.classList.toggle('popup__container_gallery')
	popupToggle();
}

const ImageOpen = () => {
	PopupPlace.classList.toggle('popup__image_open')
	popupToggle()


}

buttonEditProfile.addEventListener('click', profileEdit);
buttonAddPlace.addEventListener('click', AddPlace)
buttonCloseProfile.addEventListener('click', profileEdit);
buttonCloseGallery.addEventListener('click', AddPlace);
buttonClosePlace.addEventListener('click', ImageOpen);


function formSubmitHandler(evt) {
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	profileEdit();
}

PopupProfile.addEventListener('submit', formSubmitHandler);

const getItems = (data) => {
	const place = galleryTemplate.content.cloneNode(true);
	place.querySelector('.place__name').innerText = data.name;
	place.querySelector('.place__image').src = data.link;
	place.querySelector('.place__like').addEventListener('click', (evt) => {

		evt.target.classList.toggle('place__like_active');
	})
	place.querySelector('.place__delete').addEventListener('click', (evt) => {
		placeitem = evt.target.closest('.place');
		placeitem.remove();
	})

	place.querySelector('.place__open').addEventListener('click', (evt) => {

		placeitem = evt.target.closest('.place');

		PopupPlaceName.textContent = placeitem.querySelector('.place__name').textContent;
		PopupPlaceImage.src = placeitem.querySelector('.place__image').src;
		ImageOpen();

	})

	return place;

}




const Rendergallery = () => {
	const items = initialCards.map(Element => getItems(Element)
	)
	gallery.append(...items);
}

const addgallery = () => {
	PopupGallery.addEventListener('submit', (evt) => {
		evt.preventDefault();
		const item = getItems({

			name: galleryNameInput.value,
			link: galleryLinkInput.value
		});
		gallery.prepend(item);
		galleryNameInput.value = '';
		galleryLinkInput.value = '';
	})
}

Rendergallery();
addgallery();
