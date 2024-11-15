import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// check if project name exists
const checkProjectName = async (name: string) => {
    try {
        const projectName = await prisma.projectDetails.findFirst({
            where: {
                name: name
            }
        })
         // return true if name exists, else false

        return !!projectName
    } catch (error) {
        // throw the error to the error-handling middleware
        throw new Error('An error occurred during authentication. Please try again later.');
    }
}
export default checkProjectName