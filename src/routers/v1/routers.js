const { Router } = require('express');
const { accountRouter } = require('./account.router');
const recipeRouter = require('./recipe.router');
const menuRouter = require('./menu.router');

const router = Router();

router.use('/account', accountRouter);
router.use('/recipes/', recipeRouter);
router.use('/menu/', menuRouter);

module.exports = router;
