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

const formElement = document.querySelector('.popup__container');
const buttonEditProfile = document.querySelector('.profile__edit-button')
const buttonCloseProfile = popupProfile.querySelector('.popup__close-image')
const buttonCloseGallery = popupGallery.querySelector('.popup__close-image');
const buttonClosePlace = popupPlace.querySelector('.popup__close-image');
const popupImageOpen = document.querySelector('.popup_type_image');

const nameInput = document.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('#job-input');// Воспользуйтесь инструментом .querySelector()
const formProfile = document.querySelector('#profile')

const profileHeading = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__about');

const galleryNameInput = document.querySelector('#place-input');
const galleryLinkInput = document.querySelector('#link-input');
const formGallery = document.querySelector('#gallery');

const closePopup = (e) => {
	if (e.key === 'Escape') { togglePopup(document.querySelector('.popup__is-opened')) }
}

const handler = () => {
	togglePopup(document.querySelector('.popup__is-opened'))
}

function togglePopup(popup) {
	const overlay = popup.querySelector('.popup__overlay')
	if (popup.classList.contains('popup__is-opened')) {
		popup.classList.remove('popup__is-opened');
		overlay.removeEventListener('click', handler)
		document.removeEventListener('keydown', closePopup)
	} else {
		popup.classList.add('popup__is-opened');
		overlay.classList.add('popup__overlay_active')
		overlay.addEventListener('click', handler)
		document.addEventListener('keydown', closePopup)
	}
	if (popup === popupGallery) {
		galleryNameInput.value = '';
		galleryLinkInput.value = '';
	}
	if (popup !== popupImageOpen) {
		closeForm(popup.querySelector('.popup__content'));
	}
}

const toggleEditProfile = () => {
	togglePopup(popupProfile);
	if (popupProfile.classList.contains('popup__is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
}

buttonEditProfile.addEventListener('click', toggleEditProfile);
buttonAddPlace.addEventListener('click', () => { togglePopup(popupGallery); })
popupGallery.addEventListener('submit', () => addCardToGallery(popupGallery))

buttonCloseProfile.addEventListener('click', () => { toggleEditProfile() });

buttonCloseGallery.addEventListener('click', () => { togglePopup(popupGallery) });

buttonClosePlace.addEventListener('click', () => { togglePopup(popupImageOpen); });



function submitEditProfileForm(evt) {
	evt.preventDefault();
	profileHeading.textContent = nameInput.value;
	profileJob.textContent = jobInput.value;
	toggleEditProfile();
}

popupProfile.addEventListener('submit', submitEditProfileForm);

const createCard = (data) => {
	const place = galleryTemplate.content.cloneNode(true);
	const placeImage = place.querySelector('.place__image');
	place.querySelector('.place__name').innerText = data.name;
	placeImage.src = data.link;
	placeImage.alt = data.name;
	place.querySelector('.place__like').addEventListener('click', handleLikeIcon);
	place.querySelector('.place__delete').addEventListener('click', handleDeleteCard);
	place.querySelector('.place__open').addEventListener('click', handlePreviewPicture);
	return place;
}

const handleLikeIcon = (element) => {
	element.target.classList.toggle('place__like_active');
	//изменяет иконку лайка
};

const handleDeleteCard = (data) => {
	const placeitem = data.target.closest('.place');
	placeitem.remove();
	//удаляет карточку
};

const handlePreviewPicture = (data) => {
	const placeitem = data.target.closest('.place');
	const placeItemImage = placeitem.querySelector('.place__name');
	popupPlaceName.textContent = placeItemImage.textContent;
	popupPlaceImage.alt = placeItemImage.textContent;
	popupPlaceImage.src = placeitem.querySelector('.place__image').src;
	togglePopup(popupImageOpen);
}

const renderGallery = () => {
	const items = initialCards.map(element => createCard(element)
	)
	gallery.append(...items);
}

const addCardToGallery = (formElement) => {
	const item = createCard({
		name: galleryNameInput.value,
		link: galleryLinkInput.value
	});
	gallery.prepend(item);
	togglePopup(popupGallery);
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save-button');
	toggleButtonState(inputList, buttonElement);
}

renderGallery();
// ну если сейчас 6 пункт не правильный то я не знаю что делать и в тильте