const jwt = require('jsonwebtoken');
const accountService = require('./account.service');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');
const hash = require('../utils/hash');

function signToken(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
}

function decodeJWT(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

const checkAccountEnabled = (account) => {
  if (account.metadata.enabled === true) {
    return true;
  }
  throw new ApiError(HttpCode.BAD_REQUEST, 'Your asccount is disabled!');
};

async function login(email, password) {
  const account = await accountService.getAccountByEmailWithThrow(email, true);

  if (hash(password) === account.password) {
    checkAccountEnabled(account);
    const token = signToken({
      id: account.id,
      type: 'Bearer',
    });
    return token;
  }
  throw new ApiError(HttpCode.UNAUTHORIZED, 'Invalid password!');
}

module.exports = { decodeJWT, login, checkAccountEnabled };
