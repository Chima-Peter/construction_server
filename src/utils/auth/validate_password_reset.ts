import { body } from 'express-validator'
import HttpError from "../../utils/http_error";

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
            throw new HttpError ("Your passwords don't match", 400)
        }
        return true
    }) // check if both passwords match
]

export default validatePasswordReset