import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDeleteClick }) {

   const currentUserContext = useContext(CurrentUserContext);

   function handleClick() {
      onCardClick(card);
   }

   function handleLikeClick() {
      onCardLike(card);
   }

   function handleDeleteClick() {
      onCardDeleteClick(card._id);
   }

   // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = card.owner._id === currentUserContext._id;

   // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
   const isLiked = card.likes.some(item => item._id === currentUserContext._id);

   const cardLikeButtonClassName = `list__toggle ${isLiked ? 'list__toggle_active' : ''}`;

   return (
      <li className="list__items">
         <img src={card.link} alt={card.name} className="list__image" onClick={handleClick} />
         <div className="list__item">
            <h2 className="list__title">{card.name}</h2>
            <div className="list__like-container">
               <button className={cardLikeButtonClassName} type="button" aria-label="Отметить" onClick={handleLikeClick}></button>
               <span className="list__like-counter">{card.likes.length}</span>
            </div>
            {isOwn && <button type="button" className="list__btn" aria-label="Удалить" onClick={handleDeleteClick}
               />
            }
         </div>
      </li>
   )
}

export default Card;