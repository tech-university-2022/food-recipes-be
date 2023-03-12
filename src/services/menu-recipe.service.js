const db = require('../config/db');

const addRecipeToMenu = async (recipeId, menuId) => {
  const resp = await db.menuRecipe.upsert({
    where: {
      menu_id: menuId,
      recipe_id: recipeId,
    },
    update: {},
    create: {
      menu_id: menuId,
      recipe_id: recipeId,
    },
  });
  return resp;
};

const deleteReipeFromMenu = async (recipeId, menuId) => {
  const resp = await db.menuRecipe.delete({
    where: {
      menu_id: menuId,
      recipe_id: recipeId,
    },
  });
  return resp;
};

module.exports = {
  addRecipeToMenu,
  deleteReipeFromMenu,
};
