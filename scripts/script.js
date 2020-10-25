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
const popupGallery = document.querySelector('.popup_type_new-card');
const popupProfile = document.querySelector('.popup_type_edit');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupPlace = document.querySelector('.popup__image');
const popupPlaceName = popupPlace.querySelector('.popup__name');
const popupPlaceImage = popupPlace.querySelector('.popup__photo');



// Находим форму в DOM
const formElement = document.querySelector('.popup__container');
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

const galleryAdd = document.querySelector('.popup__save-button_gallery');



function togglePopup(data) {
	data.classList.toggle('popup_is-opened')


}

const editProfile = () => {
	togglePopup(popupProfile);
	if (popupProfile.classList.contains('popup_is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
}


const closeEscPopup = () => {
	if (popupProfile.classList.contains('popup_is-opened')) { togglePopup(popupProfile) }
	if (popupGallery.classList.contains('popup_is-opened')) { togglePopup(popupGallery) }
	if (popupImageOpen.classList.contains('popup_is-opened')) { togglePopup(popupImageOpen) }
}




buttonEditProfile.addEventListener('click', editProfile);
buttonAddPlace.addEventListener('click', () => { togglePopup(popupGallery); })

buttonCloseProfile.addEventListener('click', editProfile);
document.querySelector('#profile-overlay').addEventListener('click', (evt) => { togglePopup(popupProfile) })

buttonCloseGallery.addEventListener('click', () => { togglePopup(popupGallery); });
document.querySelector('#gallery-overlay').addEventListener('click', (evt) => { togglePopup(popupGallery) })

buttonClosePlace.addEventListener('click', () => { togglePopup(popupImageOpen); });
document.querySelector('#image-overlay').addEventListener('click', (evt) => { togglePopup(popupImageOpen) })

document.addEventListener('keydown', (evt) => { if (evt.key == 'Escape') { closeEscPopup() } })


function submitFormHandler(evt) {
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;

	editProfile();
}

popupProfile.addEventListener('submit', submitFormHandler);

const getItems = (data) => {
	const place = galleryTemplate.content.cloneNode(true);
	const placeImage = place.querySelector('.place__image');
	place.querySelector('.place__name').innerText = data.name;
	placeImage.src = data.link;
	placeImage.alt = data.name;
	place.querySelector('.place__like').addEventListener('click', handleLikeIcon);
	place.querySelector('.place__delete').addEventListener('click', handleDeleteCard);

	place.querySelector('.place__open').addEventListener('click', handlePreviewPicture);
	// => {

	// 	placeitem = evt.target.closest('.place');

	// 	popupPlaceName.textContent = placeitem.querySelector('.place__name').textContent;
	// 	popupPlaceImage.alt = placeitem.querySelector('.place__name').textContent;
	// 	popupPlaceImage.src = placeitem.querySelector('.place__image').src;
	// 	openImage();

	// })

	return place;

}

const handleLikeIcon = (Element) => {
	Element.target.classList.toggle('place__like_active');
	//изменяет иконку лайка
};

const handleDeleteCard = (Element) => {
	placeitem = Element.target.closest('.place');
	placeitem.remove();
	//удаляет карточку
};

const handlePreviewPicture = (Element) => {
	placeitem = Element.target.closest('.place');
	const placeItemImage = placeitem.querySelector('.place__name');

	popupPlaceName.textContent = placeItemImage.textContent;
	popupPlaceImage.alt = placeItemImage.textContent;
	popupPlaceImage.src = placeitem.querySelector('.place__image').src;
	togglePopup(popupImageOpen);

	//открывает попап с картинкой
}




const renderGallery = () => {
	const items = initialCards.map(Element => getItems(Element)
	)
	gallery.append(...items);
}

const addGallery = () => {
	popupGallery.addEventListener('submit', (evt) => {
		evt.preventDefault();
		const item = getItems({

			name: galleryNameInput.value,
			link: galleryLinkInput.value
		});
		gallery.prepend(item);
		togglePopup(popupGallery);


		galleryNameInput.value = '';
		galleryLinkInput.value = '';
	})

}

renderGallery();
addGallery();
