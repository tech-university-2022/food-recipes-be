import catchAsync from '../utils/catchAsync.js'
import accountService from '../services/account.service.js'
import loginService from '../services/auth.service.js'
import mapResponse from '../middlewares/response.middleware.js'

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

export { createAccount, login }