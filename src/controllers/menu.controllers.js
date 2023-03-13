const menuService = require('../services/menu.service');
const menuRecipeService = require('../services/menu-recipe.service');

const handleCreateMenu = async (req, res, next) => {
  try {
    const { name, userId } = req.body;
    const menu = await menuService.createMenu({
      name,
      userId,
    });
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

const handleGetMenuByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const menus = await menuService.getMenuByUserId(userId);
    res.json(menus);
  } catch (error) {
    next(error);
  }
};

const handleGetMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menus = await menuService.getMenuById(id);
    res.json(menus);
  } catch (error) {
    next(error);
  }
};

const handleAddRecipeToMenu = async (req, res, next) => {
  try {
    const { recipeId, menuId } = req.params;
    const resp = await menuRecipeService.addRecipeToMenu(recipeId, menuId);
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

const handleDeleteRecipeFromMenu = async (req, res, next) => {
  try {
    const { recipeId, menuId } = req.params;
    const resp = await menuRecipeService.deleteReipeFromMenu(recipeId, menuId);
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateMenu,
  handleGetMenuById,
  handleGetMenuByUserId,
  handleAddRecipeToMenu,
  handleDeleteRecipeFromMenu,
};
