const catchAsync = require('../utils/catchAsync');
const accountService = require('../services/account.service');
const authService = require('../services/auth.service');
const generateBaseResponse = require('../utils/base-response');

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, account } = await authService.login(email, password);

  res.json(generateBaseResponse({
    token,
    account,
  }));
});

const createAccount = catchAsync(async (req, res) => {
  const {
    name, email, password, avatarUrl,
  } = req.body;

  const account = await accountService.createAccount(name, email, password, avatarUrl);

  res.json(account);
});

const viewMyAccount = catchAsync(async (req, res) => {
  const { accountId } = req.accountId;

  const account = await accountService.getAccountByIdWithThrow(accountId);

  res.json(account);
});

const updateAccount = catchAsync(async (req, res) => {
  const { name, avatarUrl } = req.body;
  const { accountId } = req;

  const account = await accountService.updateAccount(accountId, name, avatarUrl);

  res.json(generateBaseResponse(account));
});
const deleteAccount = catchAsync(async (req, res) => {
  const account = await accountService.deleteAccount(req.accountId);

  res.json(generateBaseResponse(account));
});

const changePassword = catchAsync(async (req, res) => {
  const { accountId } = req;

  const { oldPassword, newPassword } = req.body;

  await accountService.checkAndChangePassword(accountId, oldPassword, newPassword);

  res.json(generateBaseResponse(true));
});

const resetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  await accountService.resetPassword(email);

  res.json(generateBaseResponse(true));
});

module.exports = {
  login,
  changePassword,
  resetPassword,
  createAccount,
  viewMyAccount,
  updateAccount,
  deleteAccount,
};
