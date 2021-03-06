import { BASE_URL } from './constants.js';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password})
  })
  .then(res => {
    if(res.ok){
      console.log(`Успешная регистрация. Статус ${res.status}`)
      return res.json();
    } else {
      console.log(`Регистрация отклонена. Ошибка ${res.status}`)
      return Promise.reject(res.status);
    }
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => {
    if(res.ok){
      console.log(`Успешная авторизация. Статус ${res.status}`)
      return res.status;
    } else {
      console.log(`Авторизация отклонена. Ошибка ${res.status}`)
      return Promise.reject(res.status);
    }
  })
};

export const getEmail = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then(res => {
    if(res.ok){
      console.log(`Email получен. Статус ${res.status}`)
      return res.json();
    } else {
      console.log(`Запрос email-а отклонен. Ошибка ${res.status}`)
      return Promise.reject(res.status);
    }
  })
}
