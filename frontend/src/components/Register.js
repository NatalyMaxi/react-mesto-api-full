import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

   const [registrationDataUser, setRegistrationDataUser] = useState({ email: '', password: '' });

   function handleChange(evt) {
      const { name, value } = evt.target;
      setRegistrationDataUser({
         ...registrationDataUser,
         [name]: value
      });
   }

   function handleSubmit(evt) {
      evt.preventDefault();
      onRegister(registrationDataUser);
   }

   return (
      <div className="capabilities">
         <h3 className="capabilities__title">Регистрация</h3>
         <form className="form" onSubmit={handleSubmit}>

            <input
               id="email"
               required
               type="email"
               className="form__item form__item_type_white"
               name="email"
               placeholder="Email"
               autoComplete="email"
               value={registrationDataUser.email}
               onChange={handleChange}
            />
            <span className="form__error form__error_place_top"></span>

            <input
               id="password"
               minLength="6"
               maxLength="20"
               required
               type="password"
               className="form__item form__item_type_white"
               name="password"
               placeholder="Пароль"
               autoComplete="password"
               value={registrationDataUser.password}
               onChange={handleChange}
            />
            <span className="form__error form__error_place_bottom"></span>

            <button
               className="form__button form__button_type_white"
               type="submit">Зарегистрироваться</button>
         </form>
         <Link to="/sign-in" className="capabilities__link">
            Уже зарегистрированы? Войти
         </Link>
      </div>
   )
}

export default Register;