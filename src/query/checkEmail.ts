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
        return !!dbEmail
    } catch (error) {
        // exit on error
        throw new Error('An error occurred during authentication. Please try again later.');
    }
}

export default checkEmail