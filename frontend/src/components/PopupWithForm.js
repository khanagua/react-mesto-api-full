import React from 'react';

function PopupWithForm(props) {

  return (
    <section className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_form">
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} onSubmit={props.onSubmit}>
          <fieldset className="form__fieldset">
            {props.children}
            <button className="form__button" type="submit" aria-label={props.buttonText}>{props.buttonText}</button>
          </fieldset>
        </form>
        <button onClick={props.onClose} className="popup__btn popup__btn_type_place" type="button"></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
