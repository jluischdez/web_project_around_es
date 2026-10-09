import { UserInfoData } from "../utils/types.js";

interface UserInfoSelectors {
  name: string;
  job: string;
  avatar: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;
  private _avatarElement: HTMLImageElement;

  constructor(selectors: UserInfoSelectors) {
    this._nameElement = document.querySelector(selectors.name) as HTMLElement;
    this._jobElement = document.querySelector(selectors.job) as HTMLElement;
    this._avatarElement =document.querySelector(selectors.avatar) as HTMLImageElement;
  }

public getUserInfo(): UserInfoData {
  return {
    name: this._nameElement.textContent!,
    about: this._jobElement.textContent!,
    avatar: this._avatarElement.src,
  };
}

public setUserInfo(data: UserInfoData): void {
  this._nameElement.textContent = data.name;
  this._jobElement.textContent = data.about;
  this._avatarElement.src = data.avatar;
}
}
