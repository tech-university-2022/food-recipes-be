const { Prisma } = require('@prisma/client');
const generateBaseResponse = require('../utils/base-response');
const ApiError = require('../utils/api-error');

function errorHandler(err, req, res) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(401).json(generateBaseResponse(null, err.message));
  } else if (err instanceof ApiError) {
    res.status(err.status).json(generateBaseResponse(null, err.message));
  } else if (err instanceof Error) {
    res.status(500).json(generateBaseResponse(null, err));
  } else {
    res.status(500).json(generateBaseResponse(null, 'Internal Server Error!'));
  }
}

module.exports = errorHandler;
