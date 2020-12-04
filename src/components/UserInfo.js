export default class Userinfo {
	constructor(infoName, infoAbout, avatar) {
		this.infoName = infoName;
      this.infoAbout = infoAbout;
      this.avatar = avatar;
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