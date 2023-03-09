import express from 'express';
import { createAccount, login } from '../../controllers/account.controller.js';
import mapResponse from '../../middlewares/response.middleware.js'
import auth from '../../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create', createAccount)

router.post('/login', login)

router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})




export { router as accountRouter };