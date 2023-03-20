const cors = require('cors');
const express = require('express');
const router = require('./routers/v1/routers');
const errorHandler = require('./middlewares/error-handler.middleware');

const app = express();

// Parse body to json
app.use(express.json());

// Cross origins enabled
app.use(cors());

app.use('/api/v1/', router);

// Handle 404 Not Found
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint Not Found!' });
});

// error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});
