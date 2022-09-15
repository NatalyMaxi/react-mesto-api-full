import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [removedCardId, setRemovedCardId] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const [editProfilePopupSubmitTitle, setEditProfilePopupSubmitTitle] = useState('Сохранить');
  const [editAvatarPopupSubmitTitle, setEditAvatarPopupSubmitTitle] = useState('Сохранить');
  const [addPlacePopupSubmitTitle, setAddPlacePopupSubmitTitle] = useState('Создать');
  const [confirmationPopupSubmitTitle, setConfirmationPopupSubmitTitle] = useState('Да'); 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardDeleteClick(cardId) {
    setIsConfirmationPopupOpen(true);
    setRemovedCardId(cardId);
  };

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setIsInfoTooltipOpen(false)
    setSelectedCard({})
  };

  function handleUpdateUser(newUserInfo) {
    setEditProfilePopupSubmitTitle('Сохранение...')
    api.updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setEditProfilePopupSubmitTitle('Сохранить')
    })
  };

  function handleUpdateAvatar(data) {
    setEditAvatarPopupSubmitTitle('Сохранение...')
    api.updateAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setEditAvatarPopupSubmitTitle('Сохранить')
      })
  };

  function handleAddPlaceSubmit(data) {
    setAddPlacePopupSubmitTitle('Создание...')
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setAddPlacePopupSubmitTitle('Создать')
      })
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  };

  function handleCardDelete(cardId) {
    setConfirmationPopupSubmitTitle('Удаление...')
    api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter(card => card._id !== cardId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setConfirmationPopupSubmitTitle('Да')
      })
  };

  function handleRegistration(data) {
    return auth
      .register(data)
      .then((data) => {
        setIsRegistrationSuccess(true);
        handleInfoTooltip();
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsRegistrationSuccess(false);
        handleInfoTooltip();
      });
  };

  function handleAuthorization(data) {
    return auth
      .authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
      });
  };

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth
      .getContent(jwt)
      .then((data) => {
        setUserEmail(data.data.email);
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history]);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header loggedIn={isLoggedIn} userEmail={userEmail} onSignOut={handleSignOut} />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleAuthorization} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegistration} />
            </Route>
            <ProtectedRoute
              path="/"
              component={Main}
              loggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleCardDeleteClick}
            />
          </Switch>
          <Footer />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            submitTitle={editProfilePopupSubmitTitle}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup
            submitTitle={editAvatarPopupSubmitTitle}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup
            submitTitle={addPlacePopupSubmitTitle}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <PopupWithConfirmation
            submitTitle={confirmationPopupSubmitTitle}
            isOpen={isConfirmationPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId} />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isConfirmed={isRegistrationSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
