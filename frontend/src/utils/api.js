import { checkResponse, BASE_URL } from './constants';
class Api {
   constructor(options) {
      this._baseUrl = options.baseUrl;
   }

   //получим информацию о пользователе
   getUserInfo(jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         }
      })
         .then((res) => checkResponse(res));
   }

   //обновим информацию пользователя
   updateUserInfo(data, jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         },
         body: JSON.stringify({
            name: data.username,
            about: data.job
         })
      })
         .then((res) => checkResponse(res));
   }

   //обновим аватар пользователя
   updateAvatar(data, jwt) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         },
         body: JSON.stringify({
            avatar: data.avatar
         })
      })
         .then((res) => checkResponse(res));
   }

   //получим карточки
   getInitialCards(jwt) {
      return fetch(`${this._baseUrl}/cards`, {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         }
      })
         .then((res) => checkResponse(res));
   }

   //добавим новую карточку
   addNewCard(data, jwt) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         },
         body: JSON.stringify({
            name: data.name,
            link: data.link
         }),
      })
         .then((res) => checkResponse(res));
   }

   //удалим карточку
   deleteCard(cardId, jwt) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         }
      })
         .then((res) => checkResponse(res));
   }

   //статус лайка/дизлайка карточки
   changeLikeCardStatus(cardId, isLiked, jwt) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: `${!isLiked ? 'DELETE' : 'PUT'}`,
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
         },
      }).then((res) => checkResponse(res));
   }
}

const api = new Api({
   baseUrl: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
   }
})

export default api;
