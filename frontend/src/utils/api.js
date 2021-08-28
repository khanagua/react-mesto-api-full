import { BASE_URL } from './constants.js';

class Api {
  constructor(BASE_URL) {
    this._BASE_URL = BASE_URL;
    this._token = localStorage.getItem('jwt');;
    // this._cohort = cohort
  }

  _getData(result) {
    if(result.ok) {
      return result.json()
     } else {
       return Promise.reject(result.status)
     } 
  }

  getInfo(part) {
    return fetch(`${this._BASE_URL}${part}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(this._getData)
  }

  getUserInfo() {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(this._getData)
  }

  changeInfo(data) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getData)
  }

  changeAvatar(data) {
    return fetch(`${this._BASE_URL}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        avatar: data.avatar
      })
    })
    .then(this._getData)
  }

  pushNewCard(data) {
    return fetch(`${this._BASE_URL}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    })
    .then(this._getData)
  }

  deleteCard(id) {
    return fetch(`${this._BASE_URL}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._getData)
  }

  addLike(id) {
    return fetch(`${this._BASE_URL}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._getData)
  }

  deleteLike(id) {
    return fetch(`${this._BASE_URL}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this._token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(this._getData)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
  }

}

const api = new Api(BASE_URL);

export default api;
