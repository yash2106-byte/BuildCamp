import { Router } from "express"
import { RegisterUser } from "../controllers/auth.controllers.js"
import { validate } from "../middleware/validator_middleware.js"
import { userRegisterValidator } from "../validators/index.js"

const router = Router()

// middleware sections
router.route("/register").post(userRegisterValidator(),validate,RegisterUser)


export default router