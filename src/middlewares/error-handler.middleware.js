const { Prisma } = require("@prisma/client");
const generateBaseResponse = require("../utils/base-response.js");
const ApiError = require('../utils/api-error.js');

function errorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(401).json(generateBaseResponse(null, err.message))
    }
    else if (err instanceof ApiError) {
        res.status(err.status).json(generateBaseResponse(null, err.message))
    }
    else if (err instanceof Error) {

    } else {
        res.status(500).json(generateBaseResponse(null, 'Internal Server Error!'))
    }

}

module.exports = errorHandler;