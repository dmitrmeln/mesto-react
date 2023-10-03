class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  getUserInfo() {
    return this._handleRequest(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  changeUserInfo(info) {
    return this._handleRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }

  getInitialCards() {
    return this._handleRequest(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  createNewCard(data) {
    return this._handleRequest(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(id) {
    return this._handleRequest(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(id) {
    return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  unlikeCard(id) {
    return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  changeAvatar(avatar) {
    return this._handleRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "cf5e389c-5bff-4b17-a8e7-c8d5e48b21ed",
    "Content-Type": "application/json",
  },
});
