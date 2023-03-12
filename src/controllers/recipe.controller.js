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

const handleCreateRecipe = async (req, res) => {
  // middleware joi check
  // call to service to save to db
  // return message
};

const handleUpdateRecipeMetadata = async (req, res) => {
  // middleware joi check
  // call to service
  // return message
};

const handleUpdateRecipeIngredient = async (req, res) => {
  // middleware joi check
  // call to service
  // return message
};

const handleDeleteRecipe = async (req, res) => {
  // middleware joi check
  // call to service
  // return message
};
module.exports = {
  getRecommended,
  getRecipeById,
  getRecipeByAccount,
};
