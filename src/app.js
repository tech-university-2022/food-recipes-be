import cors from 'cors';
import express from 'express';
import { router as sampleRouter } from './routers/v1/sample-router';

const app = express();

// Parse body to json
app.use(express.json())

// Cross origins enabled 
app.use(cors())

app.options("*", cors())

app.use('/v1/auth', sampleRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started running on port ${process.env.PORT || 3000}`)
})