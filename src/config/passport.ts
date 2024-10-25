import passport from "passport";
// import PassportLocal from 'passport-local'
// import pgPool from "./db_pool";
// import bcrypt from 'bcryptjs'

// const LocalStrategy =PassportLocal.Strategy


// // strategy passport uses to authenticate user - local strategy
// passport.use(new LocalStrategy(({
//     usernameField: 'username', // defines the field in the request body that represents the username
//     passwordField: 'password' // defines the field in the request body that represents the username.
//     // By default, passport local strategy expects the field names to be username and password
// }), async (username: string, password: string, done) => {
//     // function that validates username and password before calling serialise function on sucess.

//     // ! WRITE PRISMA ORM QUERY TO VALIDATE USERNAME AND PASSWORD.
// }))

// method passport uses to add user id to the session data
passport.serializeUser((user: any, done) => {
    done (null, user.id)
})


// method passport uses to retrieve user data and add to req object
passport.deserializeUser( async(id: number, done) => {
    // PRISMA QUERY to fetch user object from database using the id and add to the req object under the user key
})

