const db = require('../config/db');

const addRecipeToMenu = async (recipeId, menuId) => {
  const resp = await db.menuRecipe.upsert({
    where: {
      menuId_recipeId: {
        menuId,
        recipeId,
      },
    },
    update: {},
    create: {
      menu: {
        connect: {
          id: menuId,
        },
      },
      recipe: {
        connect: {
          id: recipeId,
        },
      },
    },
  });
  return resp;
};

const deleteRecipeFromMenu = async (recipeId, menuId) => {
  const resp = await db.menuRecipe.delete({
    where: {
      menuId_recipeId: {
        menuId,
        recipeId,
      },
    },
  });
  return resp;
};

module.exports = {
  addRecipeToMenu,
  deleteRecipeFromMenu,
};
