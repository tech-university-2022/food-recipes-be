import express from 'express';
import db from '../../config/db.js';

const router = express.Router();


router.get('/', (req, res) => {
    db
    res.send('Hello')
})


export { router };