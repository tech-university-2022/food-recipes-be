const { sha256 } = require('js-sha256');
const ApiError = require('./api-error');
const HttpCode = require('./http-code');

function hash(secret) {
    if (!secret) {
        throw new ApiError(HttpCode.BAD_REQUEST, 'Secret must not be empty or blank')
    }
    return sha256(secret)
}

module.exports = hash