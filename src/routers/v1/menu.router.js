const { Router } = require('express');
const menuController = require('../../controllers/menu.controllers');
const { generateValidationMiddleware } = require('../../middlewares/validation.middleware');
const {
  bodySchemaForCreateMenu,
  paramSchemaForMenuByOwnerId,
  paramSchemaForMenuById,
  bodySchemaForRecipeActionInMenu,
} = require('../../validations/menu.schema');

const menuRouter = Router();

menuRouter.get('/:id', generateValidationMiddleware(paramSchemaForMenuById, 'params'), menuController.handleGetMenuById);
menuRouter.get('/account/:accountId', generateValidationMiddleware(paramSchemaForMenuByOwnerId, 'params'), menuController.handleGetMenuByUserId);

menuRouter.post('/', generateValidationMiddleware(bodySchemaForCreateMenu), menuController.handleCreateMenu);
menuRouter.post('/recipe', generateValidationMiddleware(bodySchemaForRecipeActionInMenu, 'body'), menuController.handleAddRecipeToMenu);
menuRouter.delete('/recipe', generateValidationMiddleware(bodySchemaForRecipeActionInMenu, 'body'), menuController.handleDeleteRecipeFromMenu);

menuRouter.put(
  '/metadata/:id',
  generateValidationMiddleware('params'),
  generateValidationMiddleware('body'),
  // placeHolder for controller,
);

menuRouter.delete(
  '/:id',
  generateValidationMiddleware('params'),
// placeHolder
);

module.exports = menuRouter;
