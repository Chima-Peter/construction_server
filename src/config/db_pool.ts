import  { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

// create the connection pool
const pgPool = new Pool({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    database: process.env.DB_NAME
})

export default pgPool