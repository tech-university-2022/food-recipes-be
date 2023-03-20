const joi = require('joi');

module.exports = {
  bodySchemaForCreateComment: joi.object({
    content: joi.string().required(),
    recipeId: joi.string().required(),
  }),

  paramSchemaForCommentByRecipeId: joi.object({
    recipeId: joi.string().required(),
  }),

  paramSchemaForCommentById: joi.object({
    id: joi.string().required(),
  }),
};
