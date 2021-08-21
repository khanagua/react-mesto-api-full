import React from 'react';
import iconDone from '../images/icon-done.svg';
import iconErr from '../images/icon-err.svg';

function InfoTooltip(props) {

  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="info-tooltip popup__container">
        <img
          src={props.isSuccess ? iconDone : iconErr}
          alt={props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
          className="popup__icon"
        />
        <p className="popup__message">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button onClick={props.onClose} className="popup__btn" type="button"></button>
      </div>
    </section>
  );

}

export default InfoTooltip;
