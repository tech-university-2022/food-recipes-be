const authService = require('../services/auth.service');
const accountService = require('../services/account.service');
const UnauthorizedError = require('../errors/unauthorized.error');
const InvalidFieldError = require('../errors/invalid.error');

const auth = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token == null) {
    next(new UnauthorizedError('Not Authenticated!'));
  } else {
    token = token.replace('Bearer ', '');
    try {
      const payload = authService.decodeJWT(token);

      const account = await accountService.getAccountByIdWithThrow(payload.id);

      authService.checkAccountEnabled(account);

      req.accountId = account.id;

      next();
    } catch (err) {
      next(new InvalidFieldError('Invalid token!'));
    }
  }
};

module.exports = auth;
