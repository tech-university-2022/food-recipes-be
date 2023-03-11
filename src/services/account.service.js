const db = require('../config/db');
const ApiError = require('../utils/api-error');
const HttpCode = require('../utils/http-code');
const getRandomString = require('../utils/string');
const sendResetPasswordViaEmail = require('../external/ses');
const hash = require('../utils/hash');

async function getAccountByEmailWithThrow(email, selectPassword) {
  const account = await db.account.findUniqueOrThrow({
    where: {
      email,
    },
    select: {
      id: true,
      avatarUrl: true,
      email: true,
      name: true,
      metadata: true,
      password: selectPassword === true,
    },
  }).catch(() => {
    throw new ApiError(HttpCode.BAD_REQUEST, 'Account with this email not found!');
  });

  return account;
}

async function getAccountByIdWithThrow(id, selectPassword) {
  const account = await db.account.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      avatarUrl: true,
      name: true,
      email: true,
      metadata: true,
      password: selectPassword === true,
    },

  }).catch(() => {
    throw new ApiError(HttpCode.NOT_FOUND, 'Account Not Found!');
  });

  return account;
}

const createAccount = async (name, email, password, avatarUrl) => {
  const account = await db.account.create({
    data: {
      name,
      email,
      password: hash(password),
      avatarUrl,
      metadata: {
        enabled: true,
      },
    },
  });

  const { password: _, ...extractedAccount } = account;

  return extractedAccount;
};

async function updateAccount(id, name, avatarUrl) {
  const account = await getAccountByIdWithThrow(id);
  const newAccount = db.account.update({
    where: {
      id: account.id,
    },
    data: {
      name,
      avatarUrl,
    },
    select: {
      password: false,
      id: true,
      avatarUrl: true,
      email: true,
      metadata: true,
      name: true,
    },
  });
  return newAccount;
}

async function deleteAccount(id) {
  const account = await getAccountByIdWithThrow(id);

  return db.account.update({
    where: {
      id: account.id,
    },
    data: {
      metadata: {
        enabled: false,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      metadata: true,
    },
  });
}

const changePassword = async (id, password) => {
  const newPassword = hash(password);

  await db.account.update({
    where: {
      id,
    },
    data: {
      password: newPassword,
    },
  });

  return true;
};

const checkAndChangePassword = async (id, oldPassword, newPassword) => {
  const account = await getAccountByIdWithThrow(id, true);

  if (hash(oldPassword) === account.password) {
    changePassword(account.id, newPassword);

    return true;
  }
  throw new ApiError(HttpCode.BAD_REQUEST, 'Given old password does not match!');
};

const resetPassword = async (email) => {
  const newPassword = getRandomString(12);

  const account = await getAccountByEmailWithThrow(email);

  await changePassword(account.id, newPassword);

  await sendResetPasswordViaEmail(email, newPassword);
  return true;
};

module.exports = {
  createAccount,
  getAccountByIdWithThrow,
  getAccountByEmailWithThrow,
  checkAndChangePassword,
  updateAccount,
  deleteAccount,
  resetPassword,
};
