import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import { Request, Response, NextFunction } from 'express'
import { SendMailType } from '../@types/middleware_types'

dotenv.config() // load env variables

// create a middleware factory so we can control the type of subject, content and template for the email content
const sendMail = ({subject, content, successMsg, errorMsg} : SendMailType)  => {
    // middleware to send mail to user's email
    return (req: Request, res: Response, next: NextFunction) => {

        // set up email transporter
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
    
        // email set up config
        const emailOptions = {
            from: process.env.EMAIL, // sender email
            to: req.body.email, // user email
            subject, // email subject
            html: content // email content
        }
    
        // send mail to user via the transporter
        transporter.sendMail(emailOptions, (error) => {
            if (error) {
                // pass the error to error-handling middleware
                return next(new Error(errorMsg))
            }
            let msg = successMsg + req.body.email // append user's email to response message
            return res.json({
                responseMsg: msg // send response message to user
            })
        })
    }
}

export default sendMail

