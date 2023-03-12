const joi = require('joi');
const { Prisma } = require('@prisma/client');
const generateBaseResponse = require('../utils/base-response');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  switch (err.constructor) {
    case Prisma.PrismaClientKnownRequestError: {
      res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message));
      break;
    }
    case ApiError: {
      res.status(err.status).json(generateBaseResponse(null, err.message));
      break;
    }
    case joi.ValidationError: {
      res.status(HttpCode.BAD_REQUEST).json(generateBaseResponse(null, err.message));
      break;
    }
    case Error: {
      res.status(500).json(generateBaseResponse(null, err));
      break;
    }
    default: {
      res.status(500).json(generateBaseResponse(null, 'Internal Server Error!'));
      break;
    }
  }
}

module.exports = errorHandler;
