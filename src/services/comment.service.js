const db = require('../config/db');

const createComment = async (comment) => {
  const resp = await db.comment.create({
    data: {
      ...comment,
    },
  });
  return resp;
};

const deleteComment = async (accountId, commentId, recipeId) => {
  const resp = await db.comment.delete({
    where: {
      recipe_id: recipeId,
      account_id: accountId,
      id: commentId,
    },
  });
  return resp;
};

// TODO: add paging later
const getCommentsByRecipe = async (recipeId) => {
  const comments = await db.comment.findMany({
    where: {
      recipe_id: recipeId,
    },
  });
  return comments;
};

module.exports = {
  createComment,
  deleteComment,
  getCommentsByRecipe,
};
