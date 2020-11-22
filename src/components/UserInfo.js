export default class Userinfo {
	constructor(infoName, infoAbout) {
		this.infoName = infoName;
		this.infoAbout = infoAbout;
	}

	getUserInfo() {
		this.name = this.infoName.textContent;
		this.about = this.infoAbout.textContent;
		return ([this.name, this.about]);
	}

	setUserInfo(data) {
		this.infoName.textContent = data.name;
		this.infoAbout.textContent = data.dop;
	}
}