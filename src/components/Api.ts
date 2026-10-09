import { UserData, UserFormData, AvatarFormData, CardData, CardFormData } from "../utils/types.js"

interface ApiOptions {
  baseUrl: string;
  headers: Record<string, string>;
}

export class Api {
  private _baseUrl: string;
  private _headers: Record<string, string>;

  constructor({ baseUrl, headers }: ApiOptions) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  private async _request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${this._baseUrl}${endpoint}`, {
    ...options,
    headers: this._headers,
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  
  return res.json();
}

async getInitialCards(): Promise<CardData[]> {
    
    return this._request<CardData[]>("/cards/");
  }

  async getUserInfo(): Promise<UserData> {
  
  return this._request<UserData>("/users/me");
}

async setUserInfo(data: UserFormData): Promise<UserData> {
  
  return this._request<UserData>("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async setUserAvatar(data: AvatarFormData): Promise<UserData> {
  return this._request<UserData>("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

async postCard(data: CardFormData): Promise<CardData> {
    
    return this._request<CardData>("/cards/", {
        method: "POST",
        body: JSON.stringify(data),
    });
}


async deleteCard(cardId: string): Promise<void> {
    return this._request<void>(`/cards/${cardId}`, {
    method: "DELETE",
    });
}

async changeLikeCardStatus(
  cardId: string,
  isLiked: boolean
): Promise<CardData> {
  const method = isLiked ? "DELETE" : "PUT";

  return this._request<CardData>(`/cards/${cardId}/likes/`, {
    method,
  });
}

}