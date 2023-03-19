const joi = require('joi');

module.exports = {
  bodyLogin: joi.object({
    email: joi.string().uuid().required(),
    password: joi.string().min(8).required(),
  }),
};
