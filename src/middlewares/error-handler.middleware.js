import { Prisma } from "@prisma/client";
import generateBaseResponse from "../utils/base-response.js";

function errorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        res.status(401).json(generateBaseResponse(null, err.message))
    }
    else
        res.status(500).json(generateBaseResponse(null, 'Internal Server Error!'))
}

export default errorHandler;