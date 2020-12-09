export class Card {
	constructor({ data, handleCardClick }, itemSelector, popupDelete , api) {
		this._data = data;
		this._name = data.name;
		this._link = data.link;
		this._likes = data.likes;
		this._id= data._id;		
		this._ownerId = data.owner._id;		
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
		this._api.getInfoUser()
		.then((result)=>{if (this._ownerId===result._id){
			this._delete.classList.add('place__delete_active')}
			this.countinglikes(result)
		})
		.catch((err) => {
         console.log(err); // выведем ошибку в консоль
       });		
		return this._element;
	}

	countinglikes(result){
		this._counter.innerText = this._likes.length;
		this._likes.map((item)=>{ if (item._id===result._id){
			this._element.querySelector('.place__counter_button').classList.add('place__counter_button_active');	
		}})
	}

	_outputLiks(result,like, bool){
		this._counter.innerText = result.likes.length;
		if (bool){
			like.classList.remove('place__counter_button_active');
		}else{
			like.classList.add('place__counter_button_active');
		}
	}

	_handleLikeIcon() {
		const like =this._element.querySelector('.place__counter_button');
		if(like.classList.contains('place__counter_button_active')){		
		this._api.deleteLike(this._id)
		.then((result)=> {this._outputLiks(result,like, true)})
		.catch((err) => {
				console.log(err); // выведем ошибку в консоль
		}); 		
	}else
	{this._api.putLike(this._id)
	.then((result)=> {this._outputLiks(result,like, false)})
	.catch((err) => {
			console.log(err); // выведем ошибку в консоль
	}); 
	}
		
	};	

	removeCard(){
		this._element.remove(); 
		this._element = null; 
	}




	_setEventListeners() {
		this._element.querySelector('.place__image').addEventListener('click', () => {
			this._handleCardClick(this._data);
		});
		this._element.querySelector('.place__delete').addEventListener('click', () => {
			this._popupDelete.open(this._id,this.removeCard,this._element)
			
		});
		this._element.querySelector('.place__counter_button').addEventListener('click', () => {
			this._handleLikeIcon();
		});
	}
}
