const express = require('express');
const accountController = require('../../controllers/account.controller');
const auth = require('../../middlewares/auth.middleware');
const { generateValidationMiddleware } = require('../../middlewares/validation.middleware');
const accountSchema = require('../../validations/account.schema');

const router = express.Router();

// TODO: add joi middleware to check on inputs

router.post('/login', generateValidationMiddleware(accountSchema.bodyLogin, 'body'), accountController.login);
router.get('/protected', auth, (req, res) => {
  res.json({ accountId: req.accountId });
});

router.get('/', auth, accountController.viewMyAccount);
router.post('/create', accountController.createAccount);
router.put('/', auth, accountController.updateAccount);
router.delete('/', auth, accountController.deleteAccount);

router.post('/password', auth, accountController.changePassword);
router.post('/password/reset', accountController.resetPassword);

// where is update ?
module.exports = { accountRouter: router };
