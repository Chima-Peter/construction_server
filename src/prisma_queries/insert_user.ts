import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

// initialize prisma
const prisma = new PrismaClient();

// insert data into the user table
const insertUser = async (body: any) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                firstname: body.firstname,
                lastname: body.lastname,
                email: body.email,
                password: await bcrypt.hash(body.password, 10), // hash password
                role: "ADMIN"
            },
        });
        return newUser;
    } catch(err) {
        // throw the error to the error-handling middleware
        throw new Error("An error occurred while creating user. Please try again later.");
    }
}


export default insertUser;