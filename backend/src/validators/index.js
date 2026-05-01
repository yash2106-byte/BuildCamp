import { body } from "express-validator"

// over here we'll take each parameter coming from the frontend and then eventually check them using inbuilt functions
const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email not found")
            .isEmail()
            .withMessage("Email is not valid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lower case")
            .isLength({min: 6})
            .withMessage("Username should of atleast 6 characters"),
        
        body("password")
            .trim()
            .notEmpty()
            .isLength({min: 6})
            .withMessage("Password should be more than 6 characters"),
    ]
}

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email not found")
            .isEmail()
            .withMessage("Email is not valid"),
        
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
    ]
}

export {userRegisterValidator,userLoginValidator}
