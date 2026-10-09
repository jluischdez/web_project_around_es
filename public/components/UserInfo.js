export class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.name);
        this._jobElement = document.querySelector(selectors.job);
        this._avatarElement = document.querySelector(selectors.avatar);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent,
            avatar: this._avatarElement.src,
        };
    }
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
    }
}
