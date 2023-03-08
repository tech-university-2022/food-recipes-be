import cors from 'cors';
import express from 'express';
import router from './routers/v1/routers.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import mapResponse from './middlewares/response.middleware.js';

const app = express();

// Parse body to json
app.use(express.json())

// Cross origins enabled 
app.use(cors())

app.use('/api/v1/', router)

// error handler
app.use(errorHandler)

app.use(mapResponse)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started running on port ${process.env.PORT || 3000}`)
})