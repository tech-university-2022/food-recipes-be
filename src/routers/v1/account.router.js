const express = require('express');
const { createAccount, login } = require('../../controllers/account.controller.js');
const mapResponse = require('../../middlewares/response.middleware.js')
const auth = require('../../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/create', createAccount)

router.post('/login', login)

router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})



module.exports = { accountRouter: router };