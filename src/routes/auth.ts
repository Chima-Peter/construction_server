import express, { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import validateSignUp from '../utils/auth/validate_signup'
import insertUser from '../query/insert_signup'
import checkEmail from '../query/checkEmail'
import validateSignIn from '../utils/auth/validate_signin'
import passport from 'passport'
import { UserType } from '../@types/db'
import HttpError from "../config/http_error";

// Set up routing from auth
const authRouter = express.Router()

// User sign up route
authRouter.post('/signup', validateSignUp, async (req: Request, res: Response, next: NextFunction) : Promise<any> => {

    // check if errors were found during input validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // pass the error to next middleware
        const error = new HttpError(errors.array()[0].msg, 400)
        return next(error)
    }
    
    // check if email is already taken
    const emailCheck = await checkEmail(req.body.email)
    if (emailCheck) {
        return res.status(400).json({
            responseMsg: 'Email is already taken!'
        })
    }

    try {
            // add user to database
            const user = await insertUser(req.body)
            
            // log user in once sign up process is complete
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
authRouter.post('/signin',validateSignIn, (req: Request, res: Response, next: NextFunction) : any => {
    // check if errors were found during input validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // pass the error to next middleware
        const error = new HttpError(errors.array()[0].msg, 400)
        return next(error)
    }

    // authenticate user using passport
    passport.authenticate('local', (err: any, user: UserType, info: { message: any }) =>{
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


export default authRouter