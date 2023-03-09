const generateBaseResponse = require("../utils/base-response.js");

function mapResponse(req, res, next) {
    res.json(generateBaseResponse(res.body))
    next()
}

module.exports = mapResponse