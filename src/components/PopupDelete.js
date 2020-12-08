import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
	constructor(popup,api) { super(popup);	
		this._api= api;
		this._id= null;
		this._element = null;
		this._handlerSubmitButton = this._handlerSubmitButton.bind(this);
	}

	open(id,element){
	
		this._id= id;
		this._element =element;
		super.open();
	}

	close(){
		this._popup.removeEventListener('submit', this.submitForm);
		super.close();
		console.log(this._id);
	}	
	
	_handlerSubmitButton(evt){
		evt.preventDefault();		
		this._api.deleteCard(this._id)
		.then(()=>{this.close();
			this._element.remove(); 
		this._element = null; 
			})
		.catch((err) => {
         console.log(err); // выведем ошибку в консоль
       }); 
		
	}

	setEventListener(){
		this._popup.addEventListener('submit',this._handlerSubmitButton);
		super.setEventListener();
	}
}