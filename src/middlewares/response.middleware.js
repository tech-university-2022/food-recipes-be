import generateBaseResponse from "../utils/base-response.js";

function mapResponse(req, res, next) {
    console.log('Here')
    res.json(generateBaseResponse(res.locals.data))
    next()
}

export default mapResponse