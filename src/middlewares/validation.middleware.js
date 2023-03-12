// This function will return the middleware for validation
// First property is joi shcema
// Second property can "body", "query", "params" indicate fields that need to be validated
function generateValidationMiddleware(joiSchema, validateProperty) {
  return async function validationMiddleware(req, res, next) {
    try {
      const value = await joiSchema.validateAsync(req[validateProperty]);
      req[validateProperty] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  generateValidationMiddleware,
};
