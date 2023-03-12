const joi = require('joi');

module.exports = {
  bodySchemaForCreateRecipe: joi.object({
    name: joi.string().required(),
    author_id: joi.string().required(),
    ingredients: joi.array().items(
      joi.object({
        name: joi.string().required(),
        amount: joi.number().positive().required(),
        unit: joi.string().required(),
      }),
    ),
    steps: joi.object().required(),
    description: joi.string().required(),
    serve_for: joi.number().integer().positive().required(),
    prepare_time: joi.number().integer().positive().required(),
    cook_time: joi.number().integer().positive().required(),
  }),

  bodySchemaForUpdateRecipeMetadata: joi.object({
    name: joi.string().optional(),
    steps: joi.object().optional(),
    description: joi.string().optional(),
    serve_for: joi.number().integer().positive().optional(),
    prepare_time: joi.number().integer().positive().optional(),
    cook_time: joi.number().integer().positive().optional(),
  }),

  bodySchemaForUpdateRecipeIngredients: joi.array().items(
    joi.object({
      name: joi.string().required(),
      amount: joi.number().positive().required(),
      unit: joi.string().required(),
    }),
  ),

  paramSchemaForRecipeById: joi.object({
    id: joi.string().required(),
  }),

  paramSchemaForRecipeByAuthorId: joi.object({
    author_id: joi.string().required(),
  }),
};
