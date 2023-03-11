const { sha256 } = require('js-sha256');

function hash(secret) {
    return sha256(secret)
}

module.exports = hash