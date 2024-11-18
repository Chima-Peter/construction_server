import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// check if project exists
const checkProject = async (filters: any) => {
    try {
        const projectName = await prisma.projectDetails.findFirst({
            where: {
                ...filters
            }
        })
         // return true if field exists, else false

        return !!projectName
    } catch (error) {
        // throw the error to the error-handling middleware
        throw new Error('An error occurred while checking project. Please try again later.');
    }
}
export default checkProject