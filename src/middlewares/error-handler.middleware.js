const joi = require('joi');
const { Prisma } = require('@prisma/client');
const generateBaseResponse = require('../utils/base-response');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');
const NotFoundError = require('../errors/notfound.error');
const InvalidFieldError = require('../errors/invalid.error');
const UnauthorizedError = require('../errors/unauthorized.error');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  console.log(err);
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message.split('\n').splice(-1)[0]));
  } else {
    switch (true) {
      case err instanceof NotFoundError: {
        res.status(HttpCode.NOT_FOUND).json(generateBaseResponse(null, err.message));
        break;
      }
      case err instanceof InvalidFieldError: {
        res.status(err.stats).json(generateBaseResponse(null, err.message));
        break;
      }
      case err instanceof UnauthorizedError: {
        res.status(HttpCode.UNAUTHORIZED).json(generateBaseResponse(null, err.message));
        break;
      }
      case err instanceof ApiError: {
        res.status(err.status).json(generateBaseResponse(null, err.message));
        break;
      }
      case err instanceof joi.ValidationError: {
        res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message));
        break;
      }
      case err instanceof Error: {
        res.status(500).json(generateBaseResponse(null, err));
        break;
      }
      default: {
        res.status(500).json(generateBaseResponse(null, 'Internal Server Error!'));
        break;
      }
    }
  }
}

module.exports = errorHandler;
