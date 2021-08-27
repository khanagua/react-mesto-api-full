import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import ProtectedRoute from "./ProtectedRoute";
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.js';
import Login from './Login.js';

import InfoTooltip from './InfoTooltip.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';

import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('почта@домен')
  const history = useHistory();
  
  // Проверяет токен
  React.useEffect(() => {
    tokenCheck();
  }, []);

  // Получает данные про пользователя
  // Загружает карточки с сервера
  React.useEffect(() => {
    if(loggedIn) {

      api.getUserInfo()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.log(`Не удалось загрузить данные пользователя ${err}`));
    
      api.getInfo('/cards')
      .then(cardsList => setCards(cardsList))
      .catch(err => console.log(`Не удалось загрузить карточки с сервера ${err}`))
    } 
  }, [loggedIn]);
    
  // КАРТОЧКИ //

  // Обрабатывает клик по лайку
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => console.log(`Не удалось поставить/снять лайк ${err}`));
  }

  // Удаляет карточку
  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter(i => i._id !== card._id);
      setCards(newCards);
    })
    .catch(err => console.log(`Не удалось удалить карточку ${err}`))
  }

  // Открывает попап добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Открывает попап с изображением места
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Добавляет новую карточку
  function handleAddPlaceSubmit(newCard) {
    api.pushNewCard(newCard)
    .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
    .catch(err => console.log(`Не удалось добавить карточку ${err}`))
  }

  // ПОЛЬЗОВАТЕЛЬ //

  // Открывает попап редактирования данных пользователя
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Обновляет данные пользователя
  function handleUpdateUser(newUserData) {
    api.changeInfo(newUserData)
    .then(newUserData => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch(err => console.log(`Не удалось обновить данные ${err}`))
  }

  // АВАТАР //

  // Открывает попап изменения аватара
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  // Обновляет аватар
  function handleUpdateAvatar(newUserAvatar) {
    api.changeAvatar(newUserAvatar)
    .then(newUserAvatar => {
      setCurrentUser(newUserAvatar);
      closeAllPopups();
    })
    .catch(err => console.log(`Не удалось обновить аватар ${err}`))
  }

  // ЗАКРЫТИЕ ПОПАПОВ //

  // Закрывает по esc
  function onCloseEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  };

  // Закрывает по оверлею
  function onCloseOverlay (evt) {
    if(evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    };
  };

  // Закрывает все попапы
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }
  
  React.useEffect(() => {
    document.addEventListener('keyup', onCloseEsc);
    document.addEventListener('click', onCloseOverlay);

    return () => {
      document.removeEventListener('keyup', onCloseEsc);
      document.removeEventListener('click', onCloseOverlay);
    };
  });

  // АУТЕНТИФИКАЦИЯ //

  // Регистрация пользователя
  function handleRegister(email, password) {
    auth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      history.push('/sign-in');
      console.log('Регистрация пучком');
    })
    .catch(err => {
      if(err === 400) {
        console.log(`Некорректно заполнено одно из полей. Или пользователь уже существует`)
      } else {
        console.log(`Регистрация не пройдена: ${err}`)
      }
      setIsSuccess(false);
    })
    .finally(() => {
      setIsInfoTooltipPopupOpen(true);
      setUserEmail(email);
    });
  }

  // Авторизация пользователя
  function handleLogin(email, password) {
    auth.authorize(email, password)
    .then((res) => {
      if(res.token) {
        localStorage.setItem('jwt', res.token);
        console.log(`Сохранил токен <...>${res.token.slice(-5)}`);
        setLoggedIn(true);
        setIsSuccess(true);
        history.push('/');
        console.log('Авторизация пучком');
      } else {
        console.log('Что-то пошло не так');
      }
    })
    .catch(err => {
      switch(err) {
        case 400:
          console.log(`Не передано одно из полей. Ошибка ${err}`);
          break
        case 401:
          console.log(`Пользователь с email не найден. Ошибка ${err}`);
          break
        default:
          console.log(`Ошибка ${err}`);
          break
      }
      setLoggedIn(false);
      setIsSuccess(false);
      setIsInfoTooltipPopupOpen(true)
    })
    .finally(() => setUserEmail(email));
  }

  // Проверка токена
  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      console.log(`Сохраненный токен <...>${token.slice(-5)}`);
      auth.getEmail(token)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
          }
        })
      .catch((err) => {
        switch(err) {
          case 400:
            console.log(`Токен не передан или передан не в том формате. Ошибка ${err}`);
            break
          case 401:
            console.log(`Переданный токен некорректен. Ошибка ${err}`);
            break
          default:
            console.log(`Ошибка. ${err.message} ${err}`);
            break
        }
        setLoggedIn(false);
      })
    } else {
      console.log(`Нет сохраненного токена`);
    }
  }

  // Разлогин

  function handleLogOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
    setLoggedIn(false);
    // setIsSuccess(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <>
      <div className="page">
        <div className="wrapper">
          <Header
            email={userEmail}
            onLogOut={handleLogOut} />
          <Switch>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
              />
            </Route>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <ProtectedRoute
              exact path={'/'}
              loggedIn={loggedIn}
            >
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
          </Switch>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
			      onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            isOpen={false}
            onClose={closeAllPopups}
            buttonText="Да"
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            isSuccess={isSuccess}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </>
    </CurrentUserContext.Provider>
  );
}

export default App;
