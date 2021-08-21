import React from "react";
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const inputUserAvatar = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputUserAvatar.current.value,
    });

    inputUserAvatar.current.value = '';
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
        <input
          type="url"
          name="link"
          id="link"
          className="form__input form__input_type_link"
          placeholder="Ссылка на картинку"
          required
          ref={inputUserAvatar}
          defaultValue=" "
        />
        <span className="form__error form__error_type_link"></span>
    </PopupWithForm>
  );
}
  
export default EditAvatarPopup;
