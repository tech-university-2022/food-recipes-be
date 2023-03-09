import authService from '../services/auth.service.js';
import ApiError from '../utils/api-error.js';
import HttpCode from '../utils/http-code.js';


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

export default auth;