import { body } from 'express-validator'
import HttpError from "../../config/http_error";

// validate user sign up
const validateSignUp = [
    body('firstname')
    .notEmpty()
    .withMessage("First name field can't be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Minimum allowed for a name is 2 characters.")
    .custom((value) => {
        if (!/^[A-Za-z\s]+$/.test(value)) {
            throw new HttpError('First name can contain only alphabets', 400)
        }
        return true
    }),

    body('lastname')
    .notEmpty()
    .withMessage("Last name field can't be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Minimum allowed for a name is 2 characters.")
    .custom((value) => {
        if (!/^[A-Za-z\s]+$/.test(value)) {
            throw new HttpError('Last name can contain only alphabets', 400)
        }
        return true
    }),

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
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage("Password is too weak")
]

export default validateSignUp