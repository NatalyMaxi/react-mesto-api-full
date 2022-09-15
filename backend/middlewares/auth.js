const jsonwebtoken = require('jsonwebtoken');
const AuthorizationError = require('../Error/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    return next(new AuthorizationError('Необходимо авторизироваться'));
  }
  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError({ message: 'Необходимо авторизироваться' }));
  }req.user = payload;
  return next();
};
