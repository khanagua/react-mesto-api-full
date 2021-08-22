import {address} from './constants.js';

class Api {
  constructor(address, token) {
    this._address = address;
    this._token = token;
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
    return fetch(`${this._address}${part}`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getData)
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(this._getData)
  }

  changeInfo(data) {
    return fetch(`${this._address}/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then(this._getData)
  }

  pushNewCard(data) {
    return fetch(`${this._address}/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
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
    return fetch(`${this._address}/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getData)
  }

  addLike(id) {
    return fetch(`${this._address}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
    .then(this._getData)
  }

  deleteLike(id) {
    return fetch(`${this._address}/v1/${this._cohort}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getData)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.addLike(cardId) : this.deleteLike(cardId);
  }

  changeAvatar(data) {
    return fetch(`${this._address}/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        avatar: data.avatar
      })
    })
    .then(this._getData)
  }
}

const api = new Api(address);

export default api;
