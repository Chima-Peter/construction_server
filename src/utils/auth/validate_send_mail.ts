import { body } from 'express-validator'

const validateSendMail = [
    body('email')
    .notEmpty()
    .withMessage("Email field can't be empty")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
]

export default validateSendMail