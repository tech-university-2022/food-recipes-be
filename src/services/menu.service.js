const db = require('../config/db');

const createMenu = async (menu) => {
  const resp = await db.menu.create({
    data: {
      name: menu.name,
      owner: {
        connect: {
          id: menu.userId,
        },
      },
      metadata: {
        content: 'null',
      },
    },
  });
  return resp;
};

const getMenuById = async (id) => {
  const menu = await db.menu.findFirst({
    where: {
      id,
    },
  });
  const recipeList = await db.$queryRaw`SELECT r.id as id, r.name as name FROM "Recipe" as r JOIN "MenuRecipe" as mr ON mr.menu_id = ${id} AND mr.recipe_id = r.id`;
  menu.recipelist = recipeList;
  return menu;
};

const getMenuByUserId = async (userId) => {
  const resp = await db.menu.findMany({
    where: {
      ownerId: userId,
    },
  });
  return resp;
};

module.exports = {
  createMenu,
  getMenuById,
  getMenuByUserId,
};
