const { Router } = require('express');
const { accountRouter } = require('./account.router');
const recipeRouter = require('./recipe.router');
const menuRouter = require('./menu.router');
const commentRouter = require('./comment.router');

const router = Router();

router.use('/accounts/', accountRouter);
router.use('/recipes/', recipeRouter);
router.use('/menus/', menuRouter);
router.use('/comments/', commentRouter);

module.exports = router;
