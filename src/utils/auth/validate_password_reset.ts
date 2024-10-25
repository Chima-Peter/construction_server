import { body } from 'express-validator'

let PASSWORD = ''
// validate user password reset
const validatePasswordReset = [
   body('password')
    .notEmpty()
    .withMessage("Password can't be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage("Password is too weak")
    .custom((value) => {
        PASSWORD = value
        return true
    }),

    body('confirm-password')
    .notEmpty()
    .withMessage("Password can't be empty")
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isStrongPassword()
    .withMessage("Password is too weak")
    .custom((value) => {
        if (PASSWORD !== value) {
            throw new Error ("Passwords don't match")
        }
        return true
    }) // check if both paswords match
]

export default validatePasswordReset