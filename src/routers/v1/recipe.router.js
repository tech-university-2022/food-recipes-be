const { Router } = require('express');
const recipeController = require('../../controllers/recipe.controller');

const recipeRouter = Router();

recipeRouter.get('/recommend', recipeController.getRecommended);
recipeRouter.get('/:id', recipeController.getRecipeById);
recipeRouter.get('/account/:accountId', recipeController.getRecipeByAccount);

module.exports = recipeRouter;
