import express, { NextFunction } from 'express'
import { Request, Response } from 'express'
import HttpError from '../config/http_error'

const testRouter = express.Router()

testRouter.get('/test', (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        res.json({
            responseMsg: "logout did'nt work"
        })
        res.end()
    }
    const error = new HttpError('User is already logged out', 401)
    return next(error)
})

export default testRouter