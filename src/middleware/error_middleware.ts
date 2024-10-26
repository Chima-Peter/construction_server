import { Request, Response, NextFunction } from "express";
import HttpError from "../config/http_error";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack); // Log the error stack to the console

    // Check if the error is an instance of HttpError
    if (err instanceof HttpError) {
        // Set the status code from the HttpError
        res.status(err.status).json({
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
        });
    } else {
        // Handle generic errors
        res.status(500).json({
            message: 'Internal Server Error', // Default message for generic errors
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
        });
    }
};


export default errorHandler;