import { Router } from "express"
import { accountRouter } from "./account.router.js";;

const router = Router()

router.use('/account', accountRouter)

export default router