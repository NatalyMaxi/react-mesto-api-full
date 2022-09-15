function PopupWithForm({ isOpen, popup, onClose, title, name, children, submitTitle, onSubmit }) {

   const popupIsActive = isOpen ? 'popup_is-active' : '';
   
   return (
      <div className={`popup popup_type_${popup} ${popupIsActive}`}>
         <div className="popup__content">
            <button type="button" className="popup__close" onClick={onClose}></button>
            <h3 className="popup__title">{title}</h3>
            <form
               className="form"
               name={name}
               onSubmit={onSubmit}>
               
               {children}

               <button
                  className="form__button"
                  type="submit"
                  aria-label="Создать"
                  >{submitTitle}
                  </button>

            </form>
         </div>
      </div>
   )
}

export default PopupWithForm;