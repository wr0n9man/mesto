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

const popup = document.querySelectorAll('.popup');

function togglePopup(data) {
	data.classList.toggle('popup_is-opened')
	if (data === popupGallery) {
		galleryNameInput.value = '';
		galleryLinkInput.value = '';
	}
	if (!data.classList.contains('popup_is-opened')) {
		const overlay = data.querySelector('.popup__overlay')
		overlay.remove();
	} else {
		const overlay = document.createElement('input');
		overlay.classList.toggle('popup__overlay')
		data.prepend(overlay);
		overlay.addEventListener('click', () => { togglePopup(data); })
	}
	if (data !== popupImageOpen) {
		closeForm(data.querySelector('.popup__content'));
	}

}

const toggleEditProfile = () => {
	togglePopup(popupProfile);
	if (popupProfile.classList.contains('popup_is-opened')) {
		nameInput.value = profileHeading.textContent;
		jobInput.value = profileJob.textContent;
	}
}

const closeEscPopup = () => {
	popup.forEach((element) => { if (element.classList.contains('popup_is-opened')) { togglePopup(element) } })
}

buttonEditProfile.addEventListener('click', toggleEditProfile);
buttonAddPlace.addEventListener('click', () => { togglePopup(popupGallery); })
popupGallery.addEventListener('submit', () => addCardToGallery(popupGallery))

buttonCloseProfile.addEventListener('click', () => { toggleEditProfile() });

buttonCloseGallery.addEventListener('click', () => { togglePopup(popupGallery) });

buttonClosePlace.addEventListener('click', () => { togglePopup(popupImageOpen); });

document.addEventListener('keydown', (evt) => { if (evt.key === 'Escape') { closeEscPopup() } })

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
	galleryNameInput.value = '';
	galleryLinkInput.value = '';
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__save-button');
	toggleButtonState(inputList, buttonElement);
}

renderGallery();
// ну если сейчас 6 пункт не правильный то я не знаю что делать и в тильте