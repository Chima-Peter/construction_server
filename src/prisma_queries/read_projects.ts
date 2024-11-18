import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

// Get all project details with their related resource and budget details
const getAllProjects = async (filters: any) => {
    try {
        // get all details of project but exclude id for resource and budget details
        const projectDetails = await prisma.projectDetails.findMany({
            // conditionally filter
            where: {
                // filter based on provided filters
                ...filters,
            },
            include: {
                resourceDetails: {
                    select: {
                        type: true,
                        quantity: true,
                        cost: true,
                        unit: true,
                        // Exclude `id` and `projectID`
                    },
                },
                budgetDetails: {
                    select: {
                        estimated: true,
                        spent: true,
                        remaining: true,
                        // Exclude `id`
                    },
                },
            }
        })
        return projectDetails        
    } catch (error) {
        throw new Error('An error occurred while getting projects')
    }
}
// ADD PAGINATION FEATURE EVENTUALLY s

export default getAllProjects