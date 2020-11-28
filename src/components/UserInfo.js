export default class Userinfo {
	constructor(infoName, infoAbout) {
		this.infoName = infoName;
		this.infoAbout = infoAbout;
	}

	getUserInfo() {
		const profile= {
		name: this.infoName.textContent,
		about: this.infoAbout.textContent}
		return (profile);
	}

	setUserInfo(data) {
		this.infoName.textContent = data.name;
		this.infoAbout.textContent = data.about;
	}
}