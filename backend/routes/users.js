const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const { method } = require('../utils/method');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getAllUsers); // возвращает всех пользователей
userRouter.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе
userRouter.get( // возвращает пользователя по _id
  '/:userid',
  celebrate({
    params: Joi.object().keys({
      userid: Joi.string().hex().length(24),
    }),
  }),
  getUser,
);
userRouter.patch( // обновляет профиль
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
userRouter.patch( // обновляет аватар
  '/me/avatar', celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().custom(method),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
