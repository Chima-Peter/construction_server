import { Request, Response, NextFunction } from "express";
import HttpError from "../config/http_error";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log the error stack to the console

    // check if error comes from parsing json request body
    if (err instanceof SyntaxError) {
        res.status(400).json({
            responseMsg: 'Incorrect syntax for JSON request body. Remove trailing commas if any',
            status: 400
        })
    }
    
    // Check if the error is an instance of HttpError
    else if (err instanceof HttpError) {
        // Set the status code from the HttpError
        res.status(err.status).json({
            responseMsg: err.message || 'Internal Server Error',
            status: err.status, // Return the status code
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
        });
    } else {
        // Handle generic errors
        res.status(500).json({
            responseMsg: 'Internal Server Error', // Default message for generic errors
            status: 500, // Return the status code
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
        });
    }
};


export default errorHandler;