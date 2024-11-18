import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

// Get all project details with their related resource and budget details
const getAllProjects = async (filters: any, pagination: any) => {

    // default values for pagination page and limit
    const page = pagination.page || 1
    const limit = pagination.limit || 2

    try {
        // get all details of project but exclude id for resource and budget details
        const projectDetails = await prisma.projectDetails.findMany({
            skip: (page - 1) * limit, // number of records to skip
            take: limit, // number of records to fetch at once

            // conditionally filter and get records. returns empty record if filter doesn't match
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

        // get total number of projects so we can calculate total pages
        const totalRecords = await prisma.projectDetails.count({ where: {...filters } })
        
        // return project details, current page, total pages, and total count of projects
        return {
            data: projectDetails,
            currentPage: page,
            totalPages: Math.ceil(
                totalRecords / limit
            ),
            totalRecords
        }        
    } catch (error) {
        throw new Error('An error occurred while getting projects')
    }
}


export default getAllProjects