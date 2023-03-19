const HttpCode = require('../utils/http-code');

class NotFoundError extends Error {
  constructor(message, status = HttpCode.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}

module.exports = NotFoundError;
