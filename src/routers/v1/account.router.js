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
router.post('/password/reset', accountController.resetPassword)



module.exports = { accountRouter: router };