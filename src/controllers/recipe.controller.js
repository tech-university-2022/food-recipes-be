const recipeService = require('../services/recipe.service');
const generateBaseResponse = require('../utils/base-response');

const getRecommended = async (req, res) => {
  const recipes = await recipeService.getRecipes();

  res.json(generateBaseResponse(recipes));
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);
  res.json(generateBaseResponse(recipe));
};

const getRecipeByAccount = async (req, res) => {
  const { accountId } = req.params;
  const recipe = await recipeService.getRecipeByAccountId(accountId);
  res.json(generateBaseResponse(recipe));
};

module.exports = {
  getRecommended,
  getRecipeById,
  getRecipeByAccount,
};
