import { useState } from 'react';

function Login({ onLogin }) {

   const [loginDataUser, setLoginDataUser] = useState({ email: "", password: "" });

   function handleChange(evt) {
      const { name, value } = evt.target;
      setLoginDataUser(prevState => ({ ...prevState, [name]: value }));
   }
   
   function handleSubmit(evt) {
      evt.preventDefault();
      onLogin({
         email: loginDataUser.email,
         password: loginDataUser.password
      });
   }

   return (
      <div className="capabilities">
         <h3 className="capabilities__title">Вход</h3>
         <form className="form" onSubmit={handleSubmit}>

            <input
               id="email"
               required
               type="email"
               className="form__item form__item_type_white"
               name="email"
               placeholder="Email"
               autoComplete="email"
               value={loginDataUser.email || ''}
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
               value={loginDataUser.password || ''}
               onChange={handleChange}
            />
            <span className="form__error form__error_place_bottom"></span>

            <button
               className="form__button form__button_type_white"
               type="submit">Войти</button>
         </form>
      </div>
   )
};

export default Login;