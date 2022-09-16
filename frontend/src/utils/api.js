import { checkResponse } from './constants';

class Api {
   constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
   }

   //получим информацию о пользователе
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers
      })
         .then((res) => checkResponse(res));
   }

   //обновим информацию пользователя
   updateUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: data.username,
            about: data.job
         })
      })
         .then((res) => checkResponse(res));
   }

   //обновим аватар пользователя
   updateAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then((res) => checkResponse(res));
   }

   //получим карточки
   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      })
         .then((res) => checkResponse(res));
   }

   //добавим новую карточку
   addNewCard(data) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: data.name,
            link: data.link
         })
      })
         .then((res) => checkResponse(res));
   }

   //удалим карточку
   deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then((res) => checkResponse(res));
   }

   //статус лайка/дизлайка карточки
   changeLikeCardStatus(_id, isLiked) {

      if (isLiked) {
         return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers
         })
            .then((res) => checkResponse(res));
      } else {
         return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers
         })
            .then((res) => checkResponse(res));
      }
   }
}

const api = new Api({
   url: 'https://mesto.nomoreparties.co/v1/cohort-43',
   headers: {
      authorization: 'b10a53e7-258a-42fe-a6a2-62c2a434b14a',
      'Content-Type': 'application/json'
   }
})

export default api;