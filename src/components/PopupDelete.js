import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
	constructor(popup,api) { super(popup);	
		this._api= api;}



	close(){
		this._popup.removeEventListener('submit', this.submitForm);
		super.close();
	}	
	

	setEventListener(ip){
		this._popup.addEventListener('submit',this._api.deleteCard(ip));
		super.setEventListener();
	}
}