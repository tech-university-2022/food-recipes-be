const joi = require('joi');

module.exports = {
  bodySchemaForCreateMenu: joi.object({
    name: joi.string().required(),
    userId: joi.string().required(),
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
