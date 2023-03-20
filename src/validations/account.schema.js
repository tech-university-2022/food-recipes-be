const joi = require('joi');

module.exports = {
  bodyLogin: joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  }),
};
