interface UserData {
  name: string;
  job: string;
}

interface UserInfoSelectors {
  name: string;
  job: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _jobElement: HTMLElement;

  constructor(selectors: UserInfoSelectors) {
    this._nameElement = document.querySelector(selectors.name) as HTMLElement;
    this._jobElement = document.querySelector(selectors.job) as HTMLElement;
  }

public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent!,
      job: this._jobElement.textContent!,
    };
  }

 public setUserInfo(data: UserData): void {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}
