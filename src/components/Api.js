export default class Api {
	constructor({baseUrl, headers}) {
	  this.baseUrl = baseUrl;
	  this._headers = headers;
	}
 
	getInfoUser(){
		return fetch(`${this.baseUrl}/users/me `,{
			headers: this._headers
		})
		.then(res => {
			if (res.ok) {
			  return res.json();
			}	
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		 })
			
	}


	getInitialCards() {
		return fetch(`${this.baseUrl}/cards  `,{
			headers: this._headers
		})
		.then(res => {
			if (res.ok) {
			  return res.json();
			}
	
			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		 });
 
		}
 }