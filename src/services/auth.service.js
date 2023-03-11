const { sha256 } = require('js-sha256');
const accountService = require('./account.service.js');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/api-error.js');
const HttpCode = require('../utils/http-code.js');

function hash(secret) {
    return sha256(secret)
}

function signToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" })
    return token
}

function decodeJWT(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded
}

async function login(email, password) {
    const account = await accountService.getAccountByEmail(email);

    if (account == null) {
        throw new ApiError(HttpCode.UNAUTHORIZED, 'Account is not exists')
    } else {
        if (hash(password) === account.password) {
            const token = signToken({
                "id": account.id,
                "type": "Bearer"
            })

            return token
        } else {
            throw new ApiError(HttpCode.UNAUTHORIZED, 'Invalid password')
        }

    }
}


module.exports = { hash, decodeJWT, login }
