const joi = require('joi');

module.exports = {
  bodySchemaForCreateRecipe: joi.object({
    name: joi.string().required(),
    authorId: joi.string().required(),
    ingredients: joi.array().items(
      joi.object({
        name: joi.string().required(),
        amount: joi.number().positive().required(),
        unit: joi.string().required(),
      }),
    ),
    steps: joi.array().items(joi.string()),
    description: joi.string().required(),
    serveFor: joi.number().integer().positive().required(),
    prepareTime: joi.number().integer().positive().required(),
    cookTime: joi.number().integer().positive().required(),
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

  paramSchemaForRecipeById: joi.object({
    id: joi.string().required(),
  }),

  paramSchemaForRecipeByAuthorId: joi.object({
    accountId: joi.string().required(),
  }),
};
