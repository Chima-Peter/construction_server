import { Request, Response, NextFunction } from 'express';
import { SessionData } from 'express-session';

// Middleware to control rate limiting
const rateLimiter = (req: Request, res: Response, next: NextFunction): any => {
    const MAX_COUNT = 10; // Maximum number of requests allowed
    const TIME_WINDOW = 15 * 60 * 1000; // Time window in milliseconds (15 minutes)
    const session = req.session as SessionData; // Get the session object

    // Check if rate limiting data exists in session
    if (session.rate) {
        const rate = session.rate; 
        const currentTime = Date.now(); // Get the current time
        const elapsedTime = currentTime - rate.firstRequest; // Calculate time elapsed since first request

        // Check if the elapsed time is within the defined time window
        if (elapsedTime < TIME_WINDOW) {
            rate.count += 1; // Increment the request count
            
            // If the count exceeds the maximum allowed, send a 429 status
            if (rate.count > MAX_COUNT) {
                return res.status(429).json({ responseMsg: 'Too many requests, try again later.' });
            }
        } else {

            // If the elapsed time exceeds the time window, reset count and set a new timer
            session.rate = { count: 1, firstRequest: currentTime };
        }
    } else {

        // If no rate data exists in session, create a new rate limiting entry
        session.rate = { count: 1, firstRequest: Date.now() };
    }

    next(); // if no rate limiting issues, continue to the next middleware or route handler
};

export default rateLimiter;
