import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <a href="##" className="header__link" target="_self">
        <img src={logo} alt="Логотип Mesto" className="logo" />
      </a>
      <div className="header__container">
        <Route exact path="/">
          <p className="header__email">{props.email || "Не пришел"}</p>
          <Link to="/sign-in" className="header__link header__link_type_logout" onClick={props.onLogOut}>Выйти</Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
      </div>
    </header>    
  );
}

export default Header;
