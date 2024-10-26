// extend the interface of express session to include other properties we want
import 'express-session'


declare module 'express-session' {
    interface SessionData {
        rate?: {
            count: number;
            firstRequest: number;
        },
    }
}
