import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="places__item">
    <span className={`places__remove-btn ${isOwn ? '' : 'places__remove-btn_hidden'}`} onClick={handleDeleteClick}></span>
    <div className="place">
      <img src={props.card.link} alt={props.card.name} className="place__image" onClick={handleClick} />
      <div className="place__description">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like-counter">
          <button className={`place__like ${isLiked ? 'place__like_active' : ''}`} type="button" onClick={handleLikeClick}></button>
          <span className="place-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
    </li>	
  );
}

export default Card;
