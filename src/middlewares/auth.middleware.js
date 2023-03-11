const authService = require('../services/auth.service.js');
const accountService = require('../services/account.service.js');
const ApiError = require('../utils/api-error.js');
const HttpCode = require('../utils/http-code.js');


const auth = async (req, res, next) => {
    let token = req.headers['authorization']

    if (token == null) {
        next(new ApiError(HttpCode.UNAUTHORIZED, 'Not Authenticated!'))
    } else {
        token = token.replace('Bearer ', '')
        try {
            const payload = authService.decodeJWT(token)

            const account = await accountService.getAccountByIdWithThrow(payload.id)

            authService.checkAccountEnabled(account)

            req.accountId = account.id

            next()
        }
        catch (err) {

            if (err instanceof ApiError) {
                next(err)
            }
            next(new ApiError(HttpCode.BAD_REQUEST, 'Invalid token!'))
        }
    }
}

module.exports = auth;