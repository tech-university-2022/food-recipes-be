const { sha256 } = require('js-sha256');
const InvalidFieldError = require('../errors/invalid.error');

function hash(secret) {
  if (!secret) {
    throw new InvalidFieldError('Secret must not be empty or blank');
  }
  return sha256(secret);
}

module.exports = hash;
