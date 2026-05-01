import { Router } from "express"
import { RegisterUser,loginfunction } from "../controllers/auth.controllers.js"
import { validate } from "../middleware/validator_middleware.js"
import { userRegisterValidator,userLoginValidator } from "../validators/index.js"

const router = Router()

// middleware sections
router.route("/register").post(userRegisterValidator(),validate,RegisterUser)
router.route("/login").post(userLoginValidator(),validate,loginfunction)


export default router