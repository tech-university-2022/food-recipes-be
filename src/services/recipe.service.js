const db = require('../config/db');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');

const getRecipes = async () => db.recipe.findMany({});

// get comments here or using FE?
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

const createRecipe = async (recipe) => {
  // create in db
  const resp = await db.recipe.create({
    data: {
      ...recipe,
      status: true,
    },
  });
  // add to invert index
  return resp;
};

const updateRecipeMetadata = async (recipe) => {
  const resp = await db.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      steps: recipe.steps || undefined,
      description: recipe.description || undefined,
      serve_for: recipe.serve_for || undefined,
      prepare_time: recipe.prepare_time || undefined,
      cook_time: recipe.cook_time || undefined,
      metadata: recipe.metadata || undefined,
    },
  });
  return resp;
};

const updateRecipeIngredients = async (recipe) => {
  const resp = await db.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      ingredients: recipe.ingredients,
    },
  });
  // update invert index map
  return resp;
};

const deleteRecipe = async (recipe) => {
  const resp = await db.recipe.update({
    where: {
      id: recipe.id,
    },
    data: {
      status: false,
    },
  });
  // update invert index map
  return resp;
};

module.exports = {
  getRecipes,
  getRecipeById,
  getRecipeByAccountId,
  createRecipe,
  updateRecipeMetadata,
  updateRecipeIngredients,
  deleteRecipe,
};
