import generateBaseResponse from "../utils/base-response.js";

function mapResponse(req, res, next) {
    res.json(generateBaseResponse(res.body))
    next()
}

export default mapResponse