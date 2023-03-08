import express from 'express';
import db from '../../config/db.js';
import { uploadMediaController } from '../../controllers/upload.controller.js';
import { upload } from "express-fileupload";

const router = express.Router();

// middleware
router.use(upload())

router.get('/', (req, res) => {
    db
    res.send('Hello')
})

router.post('/media/upload', uploadMediaController)

export { router };