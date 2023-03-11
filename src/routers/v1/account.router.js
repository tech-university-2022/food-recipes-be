import express from 'express';
import { createAccount, login, update,deleteAccount} from '../../controllers/account.controller.js';
import mapResponse from '../../middlewares/response.middleware.js'
import auth from '../../middlewares/auth.middleware.js'

const router = express.Router();

router.post('/create', createAccount)

router.post('/login', login)

router.get('/protected', auth, (req, res, next) => {
    res.json({ "accountId": req.accountId })
})
router.use(auth)
router.patch('/update',auth, update,(req,res,next)=>{
    if(req.accountId != req.accountId.toString()){
        return res.status(403).send("Forbidden to edit another user");
     }
    const { error } = auth(req.accountId);
    const updatedInfor = update()
    if(error) return res.status(400).send(error.details[0].message)
    else {
        res.status(200).send(updatedInfor)
    }
   
})
router.delete('/delete/accountId',auth,deleteAccount)

export { router as accountRouter };