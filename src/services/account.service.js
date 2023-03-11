const db = require("../config/db.js");
const ApiError = require("../utils/api-error.js");
const HttpCode = require("../utils/http-code.js");
const getRandomString = require("./../utils/string.js");
const sendResetPasswordViaEmail = require("../external/ses.js");
const hash = require('../utils/hash.js');

async function getAccountByEmail(email) {

    const account = await db.account.findUnique({
        where: {
            email: email
        }
    })

    return account;
}

const createAccount = async (name, email, password, avatarUrl) => {

    const account = await db.account.create({
        data: {
            name: name,
            email: email,
            password: hash(password),
            avatarUrl: avatarUrl,
            metadata: {
                enabled: true
            }
        }
    })


    let { password: _, ...extractedAccount } = account;

    return extractedAccount
}

const changePassword = async (email, password) => {
    const account = await db.account.findUnique({
        where: {
            email: email
        }
    })

    if (!account) {
        throw new ApiError(HttpCode.SUCCESS, 'Account not found!')
    } else {
        console.log(newPassword)
        await db.account.update({
            where: {
                email: email,
            },
            data: {
                password: newPassword
            }
        })

        return true
    }
}

const resetPassword = async (email) => {

    const newPassword = getRandomString(12)
    await changePassword(email, newPassword)

    await sendResetPasswordViaEmail(email, newPassword)
    return true
}

module.exports = {
    getAccountByEmail,
    createAccount,
    resetPassword,
    changePassword
};