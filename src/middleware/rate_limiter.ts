import { Request, Response, NextFunction } from 'express';

// Middleware to control rate limiting
const rateLimiter = (req: Request, res: Response, next: NextFunction): any => {
    const MAX_COUNT = 100; // Maximum number of requests allowed
    const TIME_WINDOW = 15 * 60 * 1000; // Time window in milliseconds (15 minutes)

    // Check if rate limiting data exists in session
    if (req.session.rate) {
        const rate = req.session.rate; 
        const currentTime = Date.now(); // Get the current time
        const elapsedTime = currentTime - rate.firstRequest; // Calculate time elapsed since first request

        // Check if the elapsed time is within the defined time window
        if (elapsedTime < TIME_WINDOW) {
            rate.count += 1; // Increment the request count
            
            // If the count exceeds the maximum allowed, send a 429 status
            if (rate.count > MAX_COUNT) {
                return res.status(429).json({ message: 'Too many requests, try again later.' });
            }
        } else {

            // If the elapsed time exceeds the time window, reset count and set a new timer
            req.session.rate = { count: 1, firstRequest: currentTime };
        }
    } else {

        // If no rate data exists in session, create a new rate limiting entry
        req.session.rate = { count: 1, firstRequest: Date.now() };
    }

    // Proceed to the next middleware
    next();
};

export default rateLimiter;
