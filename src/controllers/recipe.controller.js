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

const handleCreateRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.json(generateBaseResponse(recipe));
  } catch (error) {
    next(error);
  }
};

const handleUpdateRecipeMetadata = async (req, res, next) => {
  try {
    const recipe = await recipeService.updateRecipeMetadata(req.body);
    res.json(generateBaseResponse(recipe));
  } catch (error) {
    next(error);
  }
};

const handleUpdateRecipeIngredient = async (req, res, next) => {
  try {
    const recipe = await recipeService.updateRecipeIngredients(req.body);
    res.json(generateBaseResponse(recipe));
  } catch (error) {
    next(error);
  }
};

const handleDeleteRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.deleteRecipe(req.body);
    res.json(generateBaseResponse(recipe));
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getRecommended,
  getRecipeById,
  getRecipeByAccount,
  handleCreateRecipe,
  handleUpdateRecipeMetadata,
  handleUpdateRecipeIngredient,
  handleDeleteRecipe,
};
