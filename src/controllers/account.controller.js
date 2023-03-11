const catchAsync = require('../utils/catchAsync.js');
const accountService = require('../services/account.service.js');
const authService = require('../services/auth.service.js');

const createAccount = catchAsync(async (req, res, next) => {
    const { name, email, password, avatarUrl } = req.body

    const account = await accountService.createAccount(name, email, password, avatarUrl)

    res.json(account)
})

const login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body

    const token = await authService.login(email, password)

    res.json({
        "token": token
    })
})
const update = catchAsync(async (req,res)=>{
    const {email,newName,newAvatarUrl} = req.body
    try{
        const updatedInfor = await accountService.updateAccount(email,newName,newAvatarUrl)
        res.status(200).send('Update successfully')
    }catch(error){
        res.status(500).send("Error occurs:" + error)
    }


})
const deleteAccount= catchAsync(async (req, res, next) => {
    const {email} = req.body
    const account = await accountService.deleteAccount(email)
    res.json(account)
})


const resetPassword = catchAsync(async (req, res) => {
    const { email } = req.body

    accountService.resetPassword(email)

})

module.exports = { createAccount, login, resetPassword }
