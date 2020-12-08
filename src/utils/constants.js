export const selector =".place";
export const content = document.querySelector('.content');
export const spinner = document.querySelector('.spinner');
export const popupGallery = document.querySelector('.popup_type_new-card');
export const popupProfile = document.querySelector('.popup_type_edit');
export const popupAvatar = document.querySelector('.popup_type_avatar');
export const buttonAddPlace = document.querySelector('.profile__add-button');

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');
export const popupImageOpen = document.querySelector('.popup_type_image');


export const nameInput = document.querySelector('#name-input'); // Воспользуйтесь инструментом .querySelector()
export const jobInput = document.querySelector('#job-input');// Воспользуйтесь инструментом .querySelector()
export const avatarInput = document.querySelector('#link_avatar-input');

export const profileAvatar = document.querySelector('.profile__avatar')
export const profileHeading = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__about');
export const galleryContent = popupGallery.querySelector('.popup__content')
export const profileContent = popupProfile.querySelector('.popup__content')
export const avatarContent = popupAvatar.querySelector('.popup__content')

export const place = document.querySelector('.places');


export const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save-button',
	inactiveButtonClass: 'popup__save-button_inactive',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active'
}

export const popupImage = document.querySelector('.popup__image');
export const photo = popupImage.querySelector('.popup__photo');
export const popupPreview = document.querySelector('.popup__image').querySelector('.popup__name');
export const popupDeleteImage = document.querySelector('.popup_type_delete');