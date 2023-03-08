import express from 'express';
import db from '../../config/db.js';
import { hash } from './../../services/auth.service.js'
import mapResponse from '../../middlewares/response.middleware.js';

const router = express.Router();

router.post('/create', async (req, res, next) => {
    try {
        const { name, email, password, avatarUrl, metadata } = req.body
        const user = await db.account.create({
            data: {
                "name": name,
                "email": email,
                "password": hash(password),
                "avatarUrl": avatarUrl,
                "metadata": metadata
            }
        })

        let { password: _, ...extractedUser } = user;

        res.locals.data = extractedUser

        next()

    } catch (e) {
        next(e)
    }

})


export { router as accountRouter };