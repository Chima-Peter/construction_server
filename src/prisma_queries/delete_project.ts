import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const deleteProject = async (projectID :number) => {
    try {
        // delete project if id matches
        await prisma.projectDetails.delete({
            where: {
                id: projectID
            }
        })
    } catch (error) {
        throw new Error('An error occurred while deleting project')
    }
}

export default deleteProject