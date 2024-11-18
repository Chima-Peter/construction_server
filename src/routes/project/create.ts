import express, { NextFunction, Request, Response } from 'express'
import checkAddProjectRequestBody from '../../middleware/check_c-u_req_body'
import CheckAuthenticated from '../../middleware/check_authenticated'
import checkProject from '../../prisma_queries/check_project'
import AddProject from '../../prisma_queries/create_project'
import HttpError from '../../config/http_error'

const addRouter = express.Router()

// route to create a new project
addRouter.post('/create', CheckAuthenticated, checkAddProjectRequestBody, async (req: Request, res: Response, next: NextFunction) : Promise<any> => {

    // check is project name is still free
    const nameCheck = await checkProject({name: req.body['projectDetails'].name})

    // if name exists, return error message
    if (nameCheck) {
        const error = new HttpError('There already exists a project with this name', 400)
        return next(error)
    }

    // if not taken, insert project into database
    await AddProject(req.body)

    return res.json({
        responseMsg: "Project added successfully!"
    })
})




export default addRouter