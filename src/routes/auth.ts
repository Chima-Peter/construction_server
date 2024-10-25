import express, { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import validateSignUp from '../utils/auth/validate_signup'

// Set up routing from auth
const router = express.Router()

router.post('/signup', validateSignUp, async (req: Request, res: Response, next: NextFunction) => {

    // check if errors were found during input validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ 
            error: errors
        }) // return the errors detected
    }
    // ADD USER DATA TO DATABASE

    try {
        req.login(user, (err) => {
            if (err) {
                next(err); // pass error to next middleware
            }

            // if login is successful, respond with success message
            res.status(200).json({
                responseMsg: 'Success!'
            })
        })
    } catch (err) {
        // Handle taken username error
        if (err.code == '23505') {
            res.status(401).json({
                responseMsg: 'Username has already been taken'
            })
        }

         // Handle other unexpected errors
        return res.status(500).json({
            responseMsg: 'An unexpected error occurred'
        })
    }
})

export default router