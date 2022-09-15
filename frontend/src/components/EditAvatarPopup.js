import React, { useContext, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitTitle }) {

   const currentUserContext = useContext(CurrentUserContext);
   const avatarRef = useRef();

   function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateAvatar({
         avatar: avatarRef.current.value,
      })
   };

   useEffect(() => {
      if (!isOpen) {
         avatarRef.current.value = currentUserContext.avatar
      } else {
         avatarRef.current.value = ''
      }
   }, [currentUserContext, isOpen])

   return (
      <PopupWithForm
         popup="edit-avatar"
         name="edit-avatar"
         title="Обновить аватар"
         submitTitle={submitTitle}
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            id="avatar"
            required
            type="url"
            placeholder="Ссылка на аватар"
            className="form__item"
            name="avatar"
            ref={avatarRef} />
         
         <span className="avatar-error form__error form__error_place_top"></span>
      </PopupWithForm>
   )
}

export default EditAvatarPopup;