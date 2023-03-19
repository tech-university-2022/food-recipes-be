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
    const menu = await menuService.getMenuById(id);
    res.json(menu);
  } catch (error) {
    next(error);
  }
};

// TODO: need to check if this menu belong to this user or not
const handleAddRecipeToMenu = async (req, res, next) => {
  try {
    const { recipeId, menuId } = req.body;
    const resp = await menuRecipeService.addRecipeToMenu(recipeId, menuId);
    res.json(resp);
  } catch (error) {
    next(error);
  }
};

// TODO: need to check if this menu belong to this user or not
const handleDeleteRecipeFromMenu = async (req, res, next) => {
  try {
    const { recipeId, menuId } = req.body;
    const resp = await menuRecipeService.deleteRecipeFromMenu(recipeId, menuId);
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
