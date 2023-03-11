import express from 'express';
import { createAccount, login, update } from '../../controllers/account.controller.js';
import mapResponse from '../../middlewares/response.middleware.js'
import auth from '../../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create', createAccount)

router.post('/login', login)

router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})
router.patch('/protected/accountId',auth,update,(req,res,next)=>{
   try{
    res.status(200).send('Update Successfully')

   }catch(err){
    next(err)
   }
})




export { router as accountRouter };