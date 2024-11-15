import express, { Request, Response } from 'express'
import checkAddProjectRequestBody from '../middleware/check_add_request_body'
import CheckAuthenticated from '../middleware/check_authenticated'
import checkProjectName from '../prisma_queries/check_project_name'
import AddProject from '../prisma_queries/add_project'

const addRouter = express.Router()

addRouter.post('/add', CheckAuthenticated, checkAddProjectRequestBody, async (req: Request, res: Response) : Promise<any> => {

    // check is project name is still free
    const nameCheck = await checkProjectName(req.body['projectDetails'].name)

    // if name exists, return error message
    if (nameCheck) {
        return res.status(400).json({
            responseMsg: "Project name is already taken"
        })
    }

    // if not taken, insert project into database
    await AddProject(req.body)

    return res.json({
        responseMsg: "Project added successfully!"
    })
})




export default addRouter