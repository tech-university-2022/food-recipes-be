import { sha256 } from 'js-sha256'
import accountService from './account.service.js';
import jwt from 'jsonwebtoken'
import ApiError from '../utils/api-error.js';
import HttpCode from '../utils/http-code.js';

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



export default { hash, decodeJWT, login }