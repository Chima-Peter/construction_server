import { body } from 'express-validator'

// validate user sign in
const validateSignIn = [
    body('email')
    .notEmpty()
    .withMessage("Email field can't be empty")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address"),

    body('password')
    .notEmpty()
    .withMessage("Password field can't be empty")
    .trim()
]

export default validateSignIn