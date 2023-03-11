const catchAsync = require('../utils/catchAsync.js');
const accountService = require('../services/account.service.js');
const loginService = require('../services/auth.service.js');

const createAccount = catchAsync(async (req, res, next) => {
    const { name, email, password, avatarUrl } = req.body

    const account = await accountService.createAccount(name, email, password, avatarUrl)

    res.json(account)
})

const login = catchAsync(async (req, res) => {

    const { email, password } = req.body

    const token = await loginService.login(email, password)

    res.json({
        "token": token
    })
})

module.exports = { createAccount, login }