const { Router } = require('express');
const { accountRouter } = require('./account.router');

const router = Router();

router.use('/account', accountRouter);

module.exports = router;
