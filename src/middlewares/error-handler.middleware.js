import { Prisma } from "@prisma/client";
import generateBaseResponse from "../utils/base-response.js";
import ApiError from '../utils/api-error.js';

function errorHandler(err, req, res, next) {
    console.log(err)
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

export default errorHandler;