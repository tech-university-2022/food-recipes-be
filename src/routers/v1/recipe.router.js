const { Router } = require('express');
const recipeController = require('../../controllers/recipe.controller');
const { generateValidationMiddleware } = require('../../middlewares/validation.middleware');
const {
  bodySchemaForCreateRecipe, bodySchemaForUpdateRecipeMetadata,
  paramSchemaForRecipeById, paramSchemaForRecipeByAuthorId, bodySchemaForUpdateRecipeIngredients,
} = require('../../validations/recipe.schema');

const recipeRouter = Router();

recipeRouter.get('/recommend', recipeController.getRecommended);
recipeRouter.get('/:id', generateValidationMiddleware(paramSchemaForRecipeById, 'params'), recipeController.getRecipeById);
recipeRouter.get('/account/:accountId', generateValidationMiddleware(paramSchemaForRecipeByAuthorId, 'params'), recipeController.getRecipeByAccount);

recipeRouter.post('/', generateValidationMiddleware(bodySchemaForCreateRecipe, 'body'), recipeController.handleCreateRecipe);

recipeRouter.put('/ingredients/:id', generateValidationMiddleware(paramSchemaForRecipeById, 'params'), generateValidationMiddleware(bodySchemaForUpdateRecipeIngredients, 'body'), recipeController.handleUpdateRecipeIngredient);
recipeRouter.put('/metadata/:id', generateValidationMiddleware(paramSchemaForRecipeById, 'params'), generateValidationMiddleware(bodySchemaForUpdateRecipeMetadata, 'body'), recipeController.handleUpdateRecipeMetadata);

recipeRouter.delete('/:id', generateValidationMiddleware(paramSchemaForRecipeById, 'params'), recipeController.handleDeleteRecipe);

module.exports = recipeRouter;
