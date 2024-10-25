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
    .withMessage("Password can't be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage("Password is too weak")
]

export default validateSignIn