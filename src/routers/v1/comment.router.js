const { Router } = require('express');
const commentController = require('../../controllers/comment.controllers');
const { generateValidationMiddleware } = require('../../middlewares/validation.middleware');
const {
  bodySchemaForCreateComment,
  paramSchemaForCommentById,
  paramSchemaForCommentByRecipeId,
} = require('../../validations/comment.schema');

const commentRouter = Router();

commentRouter.get('/recipe/:recipeId', generateValidationMiddleware(paramSchemaForCommentByRecipeId, 'params'), commentController.handleGetCommentByRecipe);
commentRouter.post(
  '/recipe/:recipeId',
  generateValidationMiddleware(paramSchemaForCommentByRecipeId, 'params'),
  generateValidationMiddleware(bodySchemaForCreateComment, 'body'),
  commentController.handleCreateComment,
);
commentRouter.delete('/:id', generateValidationMiddleware(paramSchemaForCommentById), commentController.handleDeleteComment);

module.exports = commentRouter;
