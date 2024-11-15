import { Request, Response, NextFunction } from "express";
import HttpError from "../config/http_error";


// check if user is authenticated
const CheckAuthenticated = (req: Request, _res: Response, next: NextFunction) => {
    // if true, send to next middleware
    if (req.isAuthenticated()) {
        next()
    }
    // else send error message for user to login
    else {
        const error = new HttpError('User is not authenticated. Please login first', 401)
        return next(error)
    }
}

export default CheckAuthenticated