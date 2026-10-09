var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _request(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, options = {}) {
            const res = yield fetch(`${this._baseUrl}${endpoint}`, Object.assign(Object.assign({}, options), { headers: this._headers }));
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            if (res.status === 204) {
                return undefined;
            }
            return res.json();
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request("/cards/");
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request("/users/me");
        });
    }
    setUserInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request("/users/me", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
    setUserAvatar(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request("/users/me/avatar", {
                method: "PATCH",
                body: JSON.stringify(data),
            });
        });
    }
    postCard(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request("/cards/", {
                method: "POST",
                body: JSON.stringify(data),
            });
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request(`/cards/${cardId}`, {
                method: "DELETE",
            });
        });
    }
    changeLikeCardStatus(cardId, isLiked) {
        return __awaiter(this, void 0, void 0, function* () {
            const method = isLiked ? "DELETE" : "PUT";
            return this._request(`/cards/${cardId}/likes/`, {
                method,
            });
        });
    }
}
