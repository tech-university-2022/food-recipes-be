const jwt = require('jsonwebtoken');
const accountService = require('./account.service');
const hash = require('../utils/hash');
const InvalidFieldError = require('../errors/invalid.error');
const UnauthorizedError = require('../errors/unauthorized.error');

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
  throw new InvalidFieldError('Your asccount is disabled!');
};

async function login(email, password) {
  const account = await accountService.getAccountByEmailWithThrow(email, true);

  if (hash(password) === account.password) {
    checkAccountEnabled(account);

    const { password: passwordInAccount, ...accountWithoutPassword } = account;
    const token = signToken({
      id: account.id,
      type: 'Bearer',
    });
    return { token, account: accountWithoutPassword };
  }
  throw new UnauthorizedError('Invalid password!');
}

module.exports = { decodeJWT, login, checkAccountEnabled };
