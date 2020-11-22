import popup from "./popup.js"
import { photo, popupPreview } from '../utils/constants.js'

export default class popupWithImage extends popup {
	constructor(popup) { super(popup) }
	openPopup(name, link) {
		popupPreview.textContent = name;
		photo.alt = name;
		photo.src = link;
		super.openPopup()
	}
}