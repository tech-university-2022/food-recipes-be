const { Router } = require("express");
const { accountRouter } = require("./account.router.js");

const router = Router()

router.use('/account', accountRouter)

module.exports = router