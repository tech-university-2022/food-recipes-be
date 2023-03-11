const express = require('express');
const accountController = require('../../controllers/account.controller.js');
const auth = require('../../middlewares/auth.middleware.js');


const router = express.Router();

router.post('/login', accountController.login)
router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})

router.get('/', auth, accountController.viewMyAccount)
router.post('/create', accountController.createAccount)
router.put('/', auth, accountController.updateAccount)
router.delete('/', auth, accountController.deleteAccount)

router.post('/password', auth, accountController.changePassword)
router.post('/password/reset', accountController.resetPassword)


module.exports = { accountRouter: router };
