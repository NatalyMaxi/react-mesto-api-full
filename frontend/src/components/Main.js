import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDeleteClick, cards, }) {

   const currentUserContext = useContext(CurrentUserContext);
   const { name, about, avatar } = currentUserContext;

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__container-avatar">
               <button className="profile__btn-avatar" onClick={onEditAvatar}></button>
               <img className="profile__image" src={avatar} alt="Аватар" />
            </div>
            <div className="profile__info">
               <div className="profile__container">
                  <h1 className="profile__title">{name}</h1>
                  <button className="profile__btn" type="button" aria-label="Редактировать" onClick={onEditProfile}></button>
               </div>
               
               <p className="profile__subtitle">{about}</p>
            </div>
            <button className="profile__button" type="button" aria-label="Добавить" onClick={onAddPlace}></button>
         </section>
         <section className="list">
            {cards.map((card) => (
               <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDeleteClick={onCardDeleteClick} />
            ))}
         </section>
      </main>
   )
}

export default Main;