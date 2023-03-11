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
const update = catchAsync(async (req,res)=>{
    const {email,newName,newAvatarUrl} = req.body
    try{
        const updatedInfor = await accountService.updateAccount(email,newName,newAvatarUrl)
        res=>res.json(updatedInfor)
    }catch(error){
        res.status(500).send("Error occurs:" + error)
    }

})
const deleteAccount= catchAsync(async (req, res, next) => {
    const {email} = req.body
    const account = await accountService.deleteAccount(email)
    res.json(account)
})


export { createAccount, login,update,deleteAccount}