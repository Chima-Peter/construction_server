import { PrismaClient } from "@prisma/client";
import { Project } from "../@types/add_project_types";

const prisma = new PrismaClient();

// Add project to db
const AddProject = async (project: Project) => {
    try {
        // Use the `create` method of Prisma Client to add a new project
        const newProject = await prisma.project.create({
            data: {
                projectDetails: {
                    create: project.projectDetails
                },
                resourceDetails: {
                    create: project.resources
                },
                budgetDetails: {
                    create: project.budget
                }
            }
        });
        return newProject; // Return the newly created project
    } catch (error) {
        console.error("Error adding project:", error);
        throw new Error("Failed to add project");
    }
}

export default AddProject
