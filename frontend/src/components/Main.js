import React from 'react';
import avatar from '../images/avatar.png';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main(props) {
  
  const currentUser = React.useContext(CurrentUserContext);

  return (
		<main className="content">
			<section className="profile">
				<button onClick={props.onEditAvatar} type="button" className="profile__edit-avatar-button"></button>
				<img src={currentUser.avatar ? currentUser.avatar : avatar} alt="Аватар пользователя" className="profile__avatar" />
				<div className="profile__info">
					<div className="profile__wrap">
						<h1 className="profile__name">{currentUser.name ? currentUser.name : 'Имя'}</h1>
						<button  onClick={props.onEditProfile} className="profile__button profile__button_type_edit-name" type="button"></button>
					</div>
					<p className="profile__about">{currentUser.about ? currentUser.about : 'Должность'}</p>
				</div>
				<button onClick={props.onAddPlace} className="profile__button profile__button_type_add-card" type="button">+</button>
			</section>
			<section className="places">
				<ul className="places__list">
          {props.cards.map((item) => (
            <Card
            key={item._id}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete} />
          ))}
        </ul>
			</section>
		</main> 
  );
}

export default Main;
