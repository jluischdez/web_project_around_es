export class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.name);
        this._jobElement = document.querySelector(selectors.job);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent,
        };
    }
    setUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._jobElement.textContent = data.job;
    }
}
