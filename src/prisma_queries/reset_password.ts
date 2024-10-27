import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

// reset password for user
const resetPassword = async (email: string, newPassword: string) => {
    // attempt to ret password
    try {
        await prisma.user.update({
            where: {
                email // find user by email
            },
            data: {
                password: await bcrypt.hash(newPassword, 10) // hash the new password
            }
        })
        return true; // password reset successful
        
    } catch (error) {
        // throw the error to the error-handling middleware
        throw new Error("An error occurred while resetting password. Please try again later.");
    }
}


export default resetPassword;