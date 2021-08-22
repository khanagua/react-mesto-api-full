import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [userData, setUserData] = React.useState(
    {
      email: "",
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
    props.onRegister(email, password);
  }

  return (
    <section className="authorization">
      <h2 className="authorization__title">Регистрация</h2>
      <form className="form" name="signUp" onSubmit={handleSubmit}>
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
          <div className="authorization__footer">
            <button className="form__button form__button_dark" type="submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
            <Link to="sign-in" className="authorization__link">Уже зарегистрированы? Войти</Link>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Register;
