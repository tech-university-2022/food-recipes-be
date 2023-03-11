const express = require('express');
const accountController = require('../../controllers/account.controller.js');
const mapResponse = require('../../middlewares/response.middleware.js')
const auth = require('../../middlewares/auth.middleware.js');


const router = express.Router();

router.post('/create', accountController.createAccount)
router.post('/login', accountController.login)
router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})

router.patch('/update/:email', accountController.update,(req,res,next)=>{
    const updatedInfor = accountController.update()
    res.send(updatedInfor)
})
router.delete('/delete/:email',accountController.deleteAccount)

router.post('/password/reset', accountController.resetPassword)


module.exports = { accountRouter: router };
