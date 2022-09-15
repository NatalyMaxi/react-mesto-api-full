class Api {
   constructor(options) {
      this._url = options.url;
      this._headers = options.headers;
   }

   //проверим ответ 
   _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
   }

   //получим информацию о пользователе
   getUserInfo() {
      return fetch(`${this._url}/users/me`, {
         headers: this._headers
      })
         .then(this._checkResponse);
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
         .then(this._checkResponse)
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
         .then(this._checkResponse)
   }

   //получим карточки
   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         headers: this._headers
      })
         .then(this._checkResponse)
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
         .then(this._checkResponse)
   }

   //удалим карточку
   deleteCard(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
         method: 'DELETE',
         headers: this._headers
      })
         .then(this._checkResponse)
   }

   //статус лайка/дизлайка карточки
   changeLikeCardStatus(_id, isLiked) {

      if (isLiked) {
         return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this._headers
         })
            .then(this._checkResponse)
      } else {
         return fetch(`${this._url}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this._headers
         })
            .then(this._checkResponse)
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