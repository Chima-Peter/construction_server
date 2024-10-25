import { body } from 'express-validator'

// validate user sign up
const validateSignUp = [
    body('firstname')
    .notEmpty()
    .withMessage("Firstname field can't be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name can't be just two character")
    .custom((value) => {
        if (!/^[A-Za-z\s]+$/.test(value)) {
            throw new Error('First name can contain only alphabets')
        }
        return true
    }),

    body('lastname')
    .notEmpty()
    .withMessage("Firstname field can't be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name can't be just two character")
    .custom((value) => {
        if (!/^[A-Za-z\s]+$/.test(value)) {
            throw new Error('First name can contain only alphabets')
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
    .withMessage("Password can't be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage("Password is too weak")
]

export default validateSignUp