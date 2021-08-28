const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { JWT_SECRET = 'secret-key' } = process.env;
// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.authMiddlewares = (req, res, next) => {
  // извлекаем и проверяем токен
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Нужно пройти авторизацию'));
  } else {
    const token = authorization.replace('Bearer ', '');
    // верифицируем токен
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
      // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
    } catch (err) {
      next(new UnauthorizedError('Нужно пройти авторизацию'));
    }
    // payload проверенного токена отправляем в запрос
    req.user = payload;
  }
  next();
};
