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
    const {newName,newAvatarUrl,newPassWord} = req.body
    try{
        if(newName!==null){
            accountService.updateAccountName(newName)
        }
        if (newAvatarUrl!==null){
            accountService.updateAccountAvatar(newAvatarUrl)
        }
        if(newPassWord!==null){
            accountService.updateAccountPassword(newPassWord)
        }
    }catch(error){
        res.status(500).send("Error occurs:" + error)
    }
   
    

})

export { createAccount, login,update}