import express, { Request, Response, NextFunction } from 'express'
import validateSignUp from '../utils/auth/validate_signup'
import insertUser from '../prisma_queries/insert_user'
import checkEmail from '../prisma_queries/check_email'
import validateSignIn from '../utils/auth/validate_signin'
import passport from 'passport'
import { UserType } from '../@types/db'
import HttpError from "../config/http_error";
import validateSendMail from '../utils/auth/validate_send_mail'
import sendMail from '../middleware/send_mail'
import checkInputValidation from '../middleware/check_input_validation'
import htmlContent from '../utils/email_layout'
import validatePasswordReset from '../utils/auth/validate_password_reset'
import resetPassword from '../prisma_queries/reset_password'
import checkRequestBody from '../middleware/check_request_body'

// Set up routing from auth
const authRouter = express.Router()

// User signup route - check that request body contains all fields, then input is validated, then checked for errors before any other operations.
authRouter.post('/signup', checkRequestBody([
    {value: 'firstname'},
    {value: 'lastname'},
    {value: 'email'},
    {value: 'password'},
]), validateSignUp, checkInputValidation, async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    // check if email is already taken
    const emailCheck = await checkEmail(req.body.email)
    if (emailCheck) {
        return res.status(400).json({
            responseMsg: 'Email is already taken!'
        })
    }

    // if not taken, insert user into database
    const user = await insertUser(req.body)
    
    // on successful user insertion, login user using passport
    req.login(user, (err) => {
        if (err) {
            const error = new HttpError('User account has been created successfully. Please log in.', 200)
            return next(error);
        }
        return res.status(201).json({
            responseMsg: 'Successfully signed in'
        })
    })
})


// user login route - check that request body is correct, then input is validated, then checked for errors before any other operations.
authRouter.post('/login', checkRequestBody([
    {value: 'email'},
    {value: 'password'},
]), validateSignIn, checkInputValidation, (req: Request, res: Response, next: NextFunction) : void => {
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


// user logout route
authRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(new Error('An error occurred while attempting to log out user. Please try again later'))
        } // pass error to error handling middleware
        res.json({
            responseMsg: 'Successfully signed out'
        })
        res.end()
    })
})


// user send email route. check for request body, input is validated, then checked for errors before any other operations.
authRouter.post('/forgot-password', checkRequestBody([
    {value: 'email'},
]), validateSendMail, checkInputValidation, sendMail({
    subject: 'Password Reset Link', // controlling the values we pass to send mail
    content: htmlContent,
    successMsg: `Password reset link has been sent to user at `,
    errorMsg: 'An error occurred while sending password reset link. Please try again later'
}))


// user forgot password route - check for request body, input is validated, then checked for errors before any other operations.
authRouter.put('/reset-password', checkRequestBody([
    {value: 'email'},
    {value: 'password'},
    {value: 'confirm-password'}
]),  validatePasswordReset, checkInputValidation, async (req: Request, res: Response) : Promise<any> => {

    // check if email exists
    const emailCheck = await checkEmail(req.body.email)
    if (!emailCheck) {
        return res.status(400).json({
            responseMsg: "There's no valid user for this email!"
        })
    }

    // call prisma query to reset password
    await resetPassword(req.body.email, req.body.password)
    res.json({
        responseMsg: 'Password has been reset successfully'
    })
    res.end()
})


export default authRouter