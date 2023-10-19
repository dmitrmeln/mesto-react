class ApiClass {
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

  setUserInfo(info) {
    return this._handleRequest(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }

  getCardList() {
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

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      });
    } else {
      return this._handleRequest(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      });
    }
  }

  setUserAvatar(avatar) {
    return this._handleRequest(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  }
}

const Api = new ApiClass({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "cf5e389c-5bff-4b17-a8e7-c8d5e48b21ed",
    "Content-Type": "application/json",
  },
});

export default Api;