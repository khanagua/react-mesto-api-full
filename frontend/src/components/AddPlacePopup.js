import React from "react";
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {
	const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

	function handleChangePlace(e) {
		setPlace(e.target.value)
	}

	function handleChangeLink(e) {
		setLink(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();

		props.onAddPlace({
			place,
			link
		});

		setPlace('');
		setLink('');
	}
  
  return (
    <PopupWithForm
			name="place"
			title="Новое место"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			buttonText="Сохранить">
				<input
					type="text"
					name="place"
					id="place"
					className="form__input form__input_type_place"
					placeholder="Название"
					minLength="2"
					maxLength="30"
					required
					value={place}
					onChange={handleChangePlace}
				/>
				<span className="form__error form__error_type_place"></span>
				<input
					type="url"
					name="link"
					id="url"
					className="form__input form__input_type_link"
					placeholder="Ссылка на картинку"
					required
					value={link}
					onChange={handleChangeLink}
				/>
				<span className="form__error form__error_type_link"></span>
		</PopupWithForm>
  );
}
  
export default AddPlacePopup;
