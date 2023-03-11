const catchAsync = require('../utils/catchAsync.js');
const accountService = require('../services/account.service.js');
const authService = require('../services/auth.service.js');
const ApiError = require('../utils/api-error.js');
const HttpCode = require('../utils/http-code.js');
const generateBaseResponse = require('../utils/base-response.js')

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body

    const token = await authService.login(email, password)

    res.json({
        "token": token
    })
})

const createAccount = catchAsync(async (req, res, next) => {
    const { name, email, password, avatarUrl } = req.body

    const account = await accountService.createAccount(name, email, password, avatarUrl)

    res.json(account)
})

const viewMyAccount = catchAsync(async (req, res, next) => {
    const accountId = req.accountId

    const account = await accountService.getAccountByIdWithThrow(accountId)

    res.json(account)

})


const updateAccount = catchAsync(async (req, res) => {
    const { name, avatarUrl } = req.body
    const accountId = req.accountId

    const account = await accountService.updateAccount(accountId, name, avatarUrl)

    res.json(generateBaseResponse(account))

})
const deleteAccount = catchAsync(async (req, res, next) => {
    const account = await accountService.deleteAccount(req.accountId)


    res.json(generateBaseResponse(account))
})

const changePassword = catchAsync(async (req, res) => {
    const accountId = req.accountId;

    const { oldPassword, newPassword } = req.body

    const account = await accountService.checkAndChangePassword(accountId, oldPassword, newPassword)

    res.json(generateBaseResponse(true))
})


const resetPassword = catchAsync(async (req, res) => {
    const { email } = req.body

    await accountService.resetPassword(email)

    res.json(generateBaseResponse(true))
})

module.exports = {
    login,
    changePassword,
    resetPassword,
    createAccount,
    viewMyAccount,
    updateAccount,
    deleteAccount,
}
