const commentService = require('../services/comment.service');

const handleCreateComment = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const { content, accountId } = req.body;
    const comment = await commentService.createComment({
      content,
      accountId,
      recipeId,
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
    const { accountId } = req.body;
    const { id } = req.params;
    const comment = await commentService.deleteComment(accountId, id);
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
