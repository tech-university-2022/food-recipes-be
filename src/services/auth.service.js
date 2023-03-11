const accountService = require('./account.service.js');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/api-error.js');
const HttpCode = require('../utils/http-code.js');
const hash = require('../utils/hash.js')

function signToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token
}

function decodeJWT(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

async function login(email, password) {
    const account = await accountService.getAccountByEmailWithThrow(email, true);

    if (hash(password) === account.password) {

        if (checkAccountEnabled(account)) {
            const token = signToken({
                "id": account.id,
                "type": "Bearer"
            })
            return token
        }

    } else {
        throw new ApiError(HttpCode.UNAUTHORIZED, 'Invalid password!')
    }
}

const checkAccountEnabled = (account) => {
    if (account.metadata['enabled'] === true) {
        return true
    } else {
        throw new ApiError(HttpCode.BAD_REQUEST, 'Your asccount is disabled!')
    }
}

module.exports = { decodeJWT, login, checkAccountEnabled }
