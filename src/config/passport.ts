import passport from "passport";
import PassportLocal from 'passport-local'
import bcrypt from 'bcryptjs'
import { PrismaClient } from "@prisma/client";
import { UserType } from "../@types/db";

const LocalStrategy =PassportLocal.Strategy
const prisma = new PrismaClient()

// passport strategy to authenticate user - local strategy
passport.use(new LocalStrategy(({
    usernameField: 'username', // defines the field in the request body that represents the username
    passwordField: 'password' // defines the field in the request body that represents the username
    
    // By default, passport local strategy expects the field names to be username and password
}), async (email: string, password: string, done) => {
    // function that validates username and password before calling serialize function on success.
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        // check if user exists for that email
        if (!user) {
            return done(null, false, { message: 'No valid user for that email' })
        }

        // check if password match but first decrypt the hashed password
        const passwordMatch = await bcrypt.compare(password, (user?.password || ''))

        // if they don't respond with error message
        if (!passwordMatch) {
            return done(null, false, { message: 'Login failed! Incorrect password' })
        }

        // return user when email and password are valid
        return done (null, (user || {}))
    } catch (error) {
        // return error when checking database
        return done(error)
    }
}))

// method passport uses to add user id to the session data
passport.serializeUser((user: any, done) => {
    done (null, user.id)
})


// method passport uses to retrieve user data and add to req object
passport.deserializeUser( async(id: number, done) => {
    // PRISMA QUERY to fetch user object from database using the id and add to the req object under the user key
    try {
        // get user from db
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        // if user exists, return user object
        if (user) {
            return done(null, user as UserType)
        } else {
            // else return false
            return done(null, false)
        }
    } catch (error) {
        // return error when checking database
        return done(error)
    }
})

