export class Card {
	constructor({ data, handleCardClick }, itemSelector,popupDeleteImage, popupDelete , api) {
		this._data = data;
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id= data._id;		
		this._ownerId = data.owner._id;
		this.popupDeleteImage =popupDeleteImage;
		this._handleCardClick = handleCardClick;
		this._itemSelector = itemSelector;
		this._popupDelete = popupDelete;
		this._api=api;
	}

	_getTemplate() {
		const place = document.querySelector('#place').content.querySelector(this._itemSelector).cloneNode(true);

		return place;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._nameCard = this._element.querySelector('.place__name')
		this._image = this._element.querySelector('.place__image');
		this._counter = this._element.querySelector('.place__counter_like');
		this._delete =this._element.querySelector('.place__delete');
		this._setEventListeners();
		this._nameCard.innerText = this._name;
		this._image.src = this._link;
		this._image.alt = this._name;
		this._counter.innerText = this._likes.length;
		this._api.getInfoUser()
		.then((result)=>{if (this._ownerId===result._id){
			this._delete.classList.add('place__delete_active')}
			this._likes.map((item)=>{ if (item._id===result._id){
				this._element.querySelector('.place__counter_button').classList.add('place__counter_button_active');	
			}})
		})		
		return this._element;
	}

	_handleLikeIcon() {
		const like =this._element.querySelector('.place__counter_button');
		if(like.classList.contains('place__counter_button_active')){
		like.classList.remove('place__counter_button_active');
		this._api.deleteLike(this._id)
		.then((result)=> this._counter.innerText = result.likes.length)		
	}else
	{like.classList.add('place__counter_button_active');
	this._api.putLike(this._id)
	.then((result)=> this._counter.innerText = result.likes.length);
	}
		
	};	

	handleDeleteCard(id) {
		const popupDeletePlace = new this._popupDelete(this.popupDeleteImage,this._api)			
				popupDeletePlace.setEventListener(id)
		popupDeletePlace.open();	
		//удаляет карточку
	};

	_setEventListeners() {
		this._element.querySelector('.place__image').addEventListener('click', () => {
			this._handleCardClick(this._data);
		});
		this._element.querySelector('.place__delete').addEventListener('click', () => {
			this.handleDeleteCard(this._id)
		});
		this._element.querySelector('.place__counter_button').addEventListener('click', () => {
			this._handleLikeIcon();
		});
	}
}
