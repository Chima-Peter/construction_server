import express, { Request, Response, NextFunction } from 'express'
import validateSignUp from '../utils/auth/validate_signup'
import insertUser from '../query/insert_signup'
import checkEmail from '../query/checkEmail'
import validateSignIn from '../utils/auth/validate_signin'
import passport from 'passport'
import { UserType } from '../@types/db'
import HttpError from "../config/http_error";
import validateSendMail from '../utils/auth/validate_send_mail'
import sendMail from '../middleware/send_mail'
import checkInputValidation from '../middleware/check_input_validation'
import htmlContent from '../utils/email_layout'

// Set up routing from auth
const authRouter = express.Router()

// User sign up route
authRouter.post('/signup', validateSignUp, checkInputValidation, async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    // check if email is already taken
    const emailCheck = await checkEmail(req.body.email)
    if (emailCheck) {
        return res.status(400).json({
            responseMsg: 'Email is already taken!'
        })
    }
    // if not taken, insert user into database
    try {
            // attempt to insert user to database
            const user = await insertUser(req.body)
            
            // on successful user insertion, login user using passport
            req.login(user, (err) => {
                if (err) {
                    const error = new HttpError('User account has been created successfully. Please log in.', 200)
                    return next(error);
                }
                return res.json({
                    responseMsg: 'Successfully signed in'
                })
            })
    } catch (err) {
        // Pass error msg to error middleware
        next(new Error('An error occurred while creating user. Please try again later.'))
    }
})


// user sign in route
authRouter.post('/signin',validateSignIn, checkInputValidation, (req: Request, res: Response, next: NextFunction) : void => {
    // authenticate user using passport
    passport.authenticate('local', (err: any, user: UserType, info: { message: any }) => {
        if (err) {
            const error = new Error('An error occurred while attempting to authenticate user. Please try again later.')
            return next(error) // pass error to middleware
        }

        // return error message if email or password is incorrect
        if (!user) {
            return res.status(400).json({
                responseMsg: info?.message || 'Authentication failed! Incorrect email or password'
            }) 
        }

        // user successfully logged in
        req.login(user, (err) => {
            if (err) {
                const error = new Error('An error occurred during login process. Try again later')
                return next(error);
            }
            return res.json({
                responseMsg: 'Successfully signed in'
            })
        });
    })(req, res, next)
})


// user sign out route
authRouter.post('/signout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(new Error('An error occurred while attempting to log out user. Please try again later'))
        } // pass error to error handling middleware
        res.json({
            responseMsg: 'Successfully signed out'
        })
    })
})


// user email input is first validated, then checked for errors before we send password reset link to user's email
authRouter.get('/sendmail', validateSendMail, checkInputValidation, sendMail({
    subject: 'Password Reset Link', // controlling the values we pass to send mail
    content: htmlContent,
    responseMsg: 'Password reset link has been sent to your email',
    errorMsg: 'An error occurred while sending password reset link. Please try again later'
}))


export default authRouter