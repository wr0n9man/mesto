import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
	constructor({popup,api,submit}) { super(popup);	
		this._submit = submit;	
		this._api= api;
		this._id= null;
		this._removeCard= null;
		this._element =null;
		this._element = null;
		this._handlerSubmitButton = this._handlerSubmitButton.bind(this);
	}

	open(id,removeCard,element){	
		this._id= id;
		this._removeCard =removeCard;	
		this._element =element;	
				
		
		super.open();
	}

	close(){
		this._popup.removeEventListener('submit', this.submitForm);
		super.close();
		console.log(this._id);
	}	
	
	_handlerSubmitButton(){
		this._submit(this._id);
		this._removeCard();	
		// не особо понимаю как мне вызывать метод card.removecard если у меня не ведь к каждой определенной карточке создается  свой объект		
	}

	setEventListener(){
		this._popup.addEventListener('submit',(evt)=>{evt.preventDefault();
			this._handlerSubmitButton()});
		super.setEventListener();
	}
}