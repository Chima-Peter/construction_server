import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// check if email exists
const checkEmail = async (email: string) => {
    try {
        const dbEmail = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        return !!dbEmail // return true if email exists, else false
    } catch (error) {
        // throw the error to the error-handling middleware
        throw new Error('An error occurred while checking user email.');
    }
}

export default checkEmail