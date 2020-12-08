export default class Section {
	constructor({ renderer }, containerSelector) {
		
		this._renderer = renderer;
		this._container = containerSelector;
	}
	renderItems(renderedItems) {
		renderedItems.forEach(item => {
			this._renderer(item);
		});
	}
	addItem(element, isArray) { 
		if (isArray) { 
		  this._container.append(element); 
		} else { 
		  this._container.prepend(element); 
		} 
	 } 

}