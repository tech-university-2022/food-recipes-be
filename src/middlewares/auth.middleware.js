const authService = require('../services/auth.service.js');
const ApiError = require('../utils/api-error.js');
const HttpCode = require('../utils/http-code.js');


const auth = (req, res, next) => {
    let token = req.headers['authorization']

    if (token == null) {
        next(new ApiError(HttpCode.UNAUTHORIZED, 'Not Authenticated!'))
    } else {
        token = token.replace('Bearer ', '')
        try {
            const payload = authService.decodeJWT(token)
            req.accountId = payload.id
            next()
        }
        catch (err) {
            next(new ApiError(HttpCode.BAD_REQUEST, 'Invalid token!'))
        }
    }
}

module.exports = auth;