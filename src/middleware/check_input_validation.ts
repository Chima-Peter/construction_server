import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import HttpError from "../config/http_error";

// middleware to check if errors were found during input validation
const checkInputValidation = (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // pass the error to next middleware
        const error = new HttpError(errors.array()[0].msg, 400)
        return next(error)
    }
    next(); // if no errors, continue to the next middleware or route handler
}

export default checkInputValidation