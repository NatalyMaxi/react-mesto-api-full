function ImagePopup({ card, onClose }) {

   return (
      <div className={`popup popup_type_image ${card.link ? 'popup_is-active' : ''}`}>
         <div className="popup__pictures-container">
            <button className="popup__close" type="button" onClick={onClose}></button>
            <figure className="popup__figure">
               <img className="popup__img" src={card.link} alt={card.name} />
               <figcaption className="popup__caption">{card.name}</figcaption>
            </figure>
         </div>
      </div>
   )
}

export default ImagePopup;