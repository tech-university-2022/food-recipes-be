const db = require('../config/db');
const NotFoundError = require('../errors/notfound.error');

const getRecipes = async () => db.recipe.findMany({ where: { status: true } });

// get comments here or using FE?
const getRecipeById = async (id) => {
  try {
    return await db.recipe.findUniqueOrThrow({
      where: {
        id,
        status: true,
      },
    });
  } catch (e) {
    throw new NotFoundError('Recipe not found!');
  }
};

const getRecipeByAccountId = async (accountId) => db.recipe.findMany({
  where: {
    authorId: accountId,
    status: true,
  },
});

const createRecipe = async (recipe) => {
  // create in db
  const resp = await db.recipe.create({
    data: {
      name: recipe.name,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      description: recipe.description,
      serveFor: recipe.serveFor,
      prepareTime: recipe.prepareTime,
      cookTime: recipe.cookTime,
      metadata: {
        content: 'null',
      },
      status: true,
      author: {
        connect: {
          id: recipe.authorId,
        },
      },
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
      serveFor: recipe.serveFor || undefined,
      prepareTime: recipe.prepareTime || undefined,
      cookTime: recipe.cookTime || undefined,
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
