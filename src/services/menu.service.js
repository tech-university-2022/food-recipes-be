const db = require('../config/db');

const createMenu = async (menu) => {
  const resp = await db.menu.create({
    data: {
      ...menu,
    },
  });
  return resp;
};

const getMenuById = async (id) => {
  const resp = await db.menu.findFirst({
    where: {
      id,
    },
  });
  return resp;
};

const getMenuByUserId = async (userId) => {
  const resp = await db.menu.findFirst({
    where: {
      user_id: userId,
    },
  });
  return resp;
};

module.exports = {
  createMenu,
  getMenuById,
  getMenuByUserId,
};
