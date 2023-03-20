const db = require('../config/db');

const createComment = async (comment) => {
  const resp = await db.comment.create({
    data: {
      content: comment.content,
      account: {
        connect: {
          id: comment.accountId,
        },
      },
      recipe: {
        connect: {
          id: comment.recipeId,
        },
      },
    },
  });
  return resp;
};

const deleteComment = async (accountId, commentId) => {
  await db.comment.findFirstOrThrow({
    where: {
      id: commentId,
      accountId,
    },
  });
  const resp = await db.comment.delete({
    where: {
      id: commentId,
    },
  });
  return resp;
};

// TODO: add paging later
const getCommentsByRecipe = async (recipeId) => {
  const comments = await db.comment.findMany({
    where: {
      recipeId,
    },
  });
  return comments;
};

module.exports = {
  createComment,
  deleteComment,
  getCommentsByRecipe,
};
