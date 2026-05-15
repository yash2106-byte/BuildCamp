import { Router } from "express"
import { RegisterUser,loginfunction, logoutUser } from "../controllers/auth.controllers.js"
import { validate } from "../middleware/validator_middleware.js"
import { userRegisterValidator,userLoginValidator } from "../validators/index.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

// middleware sections
router.route("/register").post(userRegisterValidator(),validate,RegisterUser)
router.route("/login").post(userLoginValidator(),validate,loginfunction)

// these are protected routes
router.route("/logout").post(verifyJWT,logoutUser)

export default router