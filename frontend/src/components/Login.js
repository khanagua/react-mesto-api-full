import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Login(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [userData, setUserData] = React.useState(
    {
      email: currentUser.userEmail,
      password: "",
    }
  )

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value 
    });   
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userData;
    props.onLogin(email, password);
  }

  return (
    <section className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form className="form" name="signIn" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <input
            type="email"
            name="email"
            id="email"
            className="form__input form__input_type_email form__input_type_dark"
            placeholder="Email"
            required
            value={userData.email || ''}
            onChange={handleChange}
          />
          {/* <span className="form__error form__error_type_email"></span> */}
          <input
            type="password"
            name="password"
            id="password"
            className="form__input form__input_type_password form__input_type_dark"
            placeholder="Пароль"
            required
            value={userData.password || ''}
            onChange={handleChange}
          />
          {/* <span className="form__error form__error_type_password"></span> */}
          <div class="authorization__footer">
            <button className="form__button form__button_dark" type="submit" aria-label="Войти">Войти</button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
