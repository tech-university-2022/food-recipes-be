const { Router } = require('express');
const { accountRouter } = require('./account.router');
const recipeRouter = require('./recipe.router');

const router = Router();

router.use('/account', accountRouter);
router.use('/recipes/', recipeRouter);

module.exports = router;
