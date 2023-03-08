import express from 'express';
import db from '../../config/db.js';

const router = express.Router();

router.post('/create', (req, res) => {
    const { email, password } = req.body

    res.send(email + password)
})


export { router };