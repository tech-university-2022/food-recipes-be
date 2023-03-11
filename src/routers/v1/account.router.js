const express = require('express');
const { createAccount, login,update,deleteAccount } = require('../../controllers/account.controller.js');
const mapResponse = require('../../middlewares/response.middleware.js')
const auth = require('../../middlewares/auth.middleware.js');


const router = express.Router();

router.post('/create', createAccount)

router.post('/login', login)

router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})
router.patch('/update',auth, update,(req,res,next)=>{
    const updatedInfor = update()
    res.send(updatedInfor)
})
router.delete('/delete/accountId',auth,deleteAccount)

module.exports = { accountRouter: router };
