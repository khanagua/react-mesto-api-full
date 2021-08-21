import React from "react";
import PopupWithForm from './PopupWithForm.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="user"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText = "Сохранить"
      onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          className="form__input form__input_type_name"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="form__error form__error_type_name"></span>
        <input
          type="text"
          name="about"
          id="about"
          className="form__input form__input_type_about"
          placeholder="Ваша специальность"
          minLength="2"
          maxLength="200"
          required
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="form__error form__error_type_about"></span>
    </PopupWithForm>
  );
}
  
export default EditProfilePopup;
