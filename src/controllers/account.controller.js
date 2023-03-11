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
    const {name,avatarUrl} = req.body
    try{
        await accountService.updateAccount(req.params.email,name,avatarUrl)
        res.status(200).send('Update successfully')
    }catch(error){
        res.status(500).send("Error occurs:" + error)
    }


})
const deleteAccount= catchAsync(async (req, res, next) => {
    try{
       console.log(req.params.email)
    await accountService.deleteAccount(req.params.email)
    res.status(200).send("Deleted account")
}
    catch(error){
        next(error)
      
    }
})


const resetPassword = catchAsync(async (req, res) => {
    const { email } = req.body

    accountService.resetPassword(email)

})

module.exports = { createAccount, login, resetPassword,update,deleteAccount}
