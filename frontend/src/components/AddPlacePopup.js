import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitTitle }) {

   const [formValues, setFormValues] = useState({ name: "", link: "" });
   const handleChange = (evt) => {
      const { name, value } = evt.target;
      setFormValues(prevState => ({ ...prevState, [name]: value }));
   }

   function handleSubmit(evt) {
      evt.preventDefault()
      onAddPlace({
         name: formValues.name,
         link: formValues.link
      })
   }

   useEffect(() => {
   setFormValues({
   name: "",
   link: ""
   })
   }, [isOpen])

   return (
      <PopupWithForm
         popup="add"
         name="add-images"
         title="Новое место"
         submitTitle={submitTitle}
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >
         <input
            id="region"
            minLength="2"
            maxLength="30"
            required
            type="text"
            placeholder="Название"
            className="form__item"
            name="name"
            value={formValues.name}
            onChange={handleChange} />
         
         <span className="region-error form__error form__error_place_top"></span>

         <input
            id="link"
            required
            type="url"
            placeholder="Ссылка на картинку"
            className="form__item"
            name="link"
            value={formValues.link}
            onChange={handleChange} />
         
         <span className="link-error form__error form__error_place_bottom"></span>
      </PopupWithForm>
   )
}

export default AddPlacePopup;