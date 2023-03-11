const generateBaseResponse = require('../utils/base-response');

function mapResponse(req, res, next) {
  res.json(generateBaseResponse(res.body));
  next();
}

module.exports = mapResponse;
