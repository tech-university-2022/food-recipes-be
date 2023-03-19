const commentService = require('../services/comment.service');

const handleCreateComment = async (req, res, next) => {
  try {
    const { content, accountId, recipeId } = req.body;
    const comment = await commentService.createMenu({
      content,
      account_id: accountId,
      recipe_id: recipeId,
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

const handleGetCommentByRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const comments = await commentService.getCommentsByRecipe(recipeId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const handleDeleteComment = async (req, res, next) => {
  try {
    const { content, accountId, recipeId } = req.body;
    const comment = await commentService.deleteComment(content, accountId, recipeId);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateComment,
  handleGetCommentByRecipe,
  handleDeleteComment,
};
