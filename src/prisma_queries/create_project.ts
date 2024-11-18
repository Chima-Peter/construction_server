import { PrismaClient } from "@prisma/client";
import { Project } from "../@types/add_project_types";

const prisma = new PrismaClient();

// Add project to the database
const AddProject = async (project: Project) => {
    try {
        // Use the `create` method of Prisma Client to add a new project with nested relations
        // store empty values if the user doesn't provide them. Only for optional fields tho, user must provide required fields.
        await prisma.projectDetails.create({
            data: {
                name: project.projectDetails.name,
                manager: project.projectDetails.manager,
                progress: project.projectDetails.progress,
                status: project.projectDetails.status,
                startDate: project.projectDetails.startDate,
                endDate: project.projectDetails.endDate,
                keyDetails: project.projectDetails.keyDetails,
                milestones: project.projectDetails.milestones,
                cancellationReason: project.projectDetails.cancellationReason || "",
                pauseReason: project.projectDetails.pauseReason || "",
                userId: project.projectDetails.userId,
                budgetDetails: {
                    create: {
                        estimated: project.budget.estimated || 0,
                        spent: project.budget.spent || 0,
                        remaining: project.budget.remaining || 0,
                    },
                },
                resourceDetails: {
                    create: project.resources.map((resource) => ({
                        type: resource.type || '',
                        quantity: resource.quantity || 0,
                        cost: resource.cost || 0,
                        unit: resource.unit || '',
                    })),
                },
            },
        });
    } catch (error) {
        throw new Error("An error occurred while creating project");
    }
};

export default AddProject;
