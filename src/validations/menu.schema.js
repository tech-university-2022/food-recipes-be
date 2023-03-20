const joi = require('joi');

module.exports = {
  bodySchemaForCreateMenu: joi.object({
    name: joi.string().required(),
    userId: joi.string().required(),
  }),

  bodySchemaForUpdateRecipeMetadata: joi.object({
    name: joi.string().optional(),
    steps: joi.array().items(joi.string()),
    description: joi.string().optional(),
    serveFor: joi.number().integer().positive().optional(),
    prepareTime: joi.number().integer().positive().optional(),
    cookTime: joi.number().integer().positive().optional(),
  }),

  bodySchemaForUpdateRecipeIngredients: joi.object({
    ingredients: joi.array().items(
      joi.object({
        name: joi.string().required(),
        amount: joi.number().positive().required(),
        unit: joi.string().required(),
      }),
    ),
  }),

  bodySchemaForRecipeActionInMenu: joi.object({
    recipeId: joi.string().required(),
    menuId: joi.string().required(),
  }),

  paramSchemaForMenuById: joi.object({
    id: joi.string().required(),
  }),

  paramSchemaForMenuByOwnerId: joi.object({
    accountId: joi.string().required(),
  }),
};
