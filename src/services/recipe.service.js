const db = require('../config/db');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

const getRecipes = async () => db.recipe.findMany({});

const getRecipeById = async (id) => {
  try {
    return await db.recipe.findUniqueOrThrow({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new ApiError(HttpCode.BAD_REQUEST, 'Recipe not found');
  }
};

const getRecipeByAccountId = async (accountId) => db.recipe.findMany({
  where: {
    authorId: accountId,
  },
});

module.exports = {
  getRecipes,
  getRecipeById,
  getRecipeByAccountId,
};
