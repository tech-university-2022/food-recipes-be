import { sha256 } from 'js-sha256'
function hash(secret) {
    return sha256(secret)
}

export { hash }