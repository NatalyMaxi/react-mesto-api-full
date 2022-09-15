// попап редактирования профиля
const modalWindowEdit = document.querySelector('.popup_type_edit');
const formEditProfile = modalWindowEdit.querySelector('[name="subscribeForm"]');
const nameInput = formEditProfile.querySelector('[name="username"]');
const jobInput = formEditProfile.querySelector('[name="job"]');

//попап редактирования аватара
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const btnEditAvatar = document.querySelector('.profile__btn-avatar');
const formEditAvatar = popupEditAvatar.querySelector('[name="edit-avatar"]');
const avatar = document.querySelector('.profile__image');

// попап добавления карточки
const modalWindowAdd = document.querySelector('.popup_type_add');;
const modalWindowAddNewCardOpenBtn = document.querySelector('.profile__button');
const formAddNewCard = modalWindowAdd.querySelector('[name="add-images"]');

const config = {
   formSelector: '.form',
   inputSelector: '.form__item',
   submitButtonSelector: '.form__button',
   inactiveButtonClass: 'form__button_type_disabled',
   inputErrorClass: 'form__item_type_error',
   errorClass: 'form__error_visible'
};

export {
   formEditProfile,
   nameInput,
   jobInput,
   formEditAvatar,
   btnEditAvatar,
   avatar,
   modalWindowAddNewCardOpenBtn,
   formAddNewCard,
   config
}
