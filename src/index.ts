import express from 'express';
import session from 'express-session';
import pgPool from './config/db_pool';
import dotenv from 'dotenv';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
// import rateLimiter from './middleware/rate_limiter';
import authRouter from './routes/auth';
import errorHandler from './middleware/error_middleware';
import './config/passport'; // Passport configuration
import testRouter from './routes/test';
import addRouter from './routes/add';

dotenv.config(); // Load environment variables

const app = express();
const sessionStore = connectPgSimple(session);


// Middleware to handle CORS
app.use(cors({
    origin: 'http://localhost:5173/',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
}));

// // Middleware to handle rate limiting
// app.use(rateLimiter);

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    store: new sessionStore({
        pool: pgPool, // Connection pool for PostgreSQL
        tableName: 'session', // Table to store session data
        createTableIfMissing: true
    }),
    secret: process.env.SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reset the cookie max age on every response
    cookie: {
        maxAge: 1000 * 60 * 15, // 15 minutes
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: 'strict', // Prevent CSRF attacks
        httpOnly: true // Prevent XSS attacks
    },
    name: 'seamless'
}));

// Passport middleware for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use((req, _res, next) => {
    console.log(req.ip)
    console.log(req.headers['X-Forwarded-to'])
    next()
})

// ROUTING
app.use('/api/v1', authRouter) // authentication routes
app.use('/api/v1', testRouter) // testing logout routes
app.use('/api/v1', addRouter) // adding project route


// Error handling middleware
app.use(errorHandler)

// Start the server
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
