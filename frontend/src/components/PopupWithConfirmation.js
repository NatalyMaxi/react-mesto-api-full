import PopupWithForm from './PopupWithForm.js'

function PopupWithConfirmation({ isOpen, onClose, card, onSubmit, submitTitle }) {

   function handleConfirmiation(evt) {
      evt.preventDefault();
      onSubmit(card);
   };

   return (
      <PopupWithForm
         popup="delete-card"
         name="delete-card"
         title="Вы уверены?"
         submitTitle={submitTitle}
         onClose={onClose}
         isOpen={isOpen}
         onSubmit={handleConfirmiation}
      >
      </PopupWithForm>
   )
}

export default PopupWithConfirmation;