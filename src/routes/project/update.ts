import express, { NextFunction, Request, Response } from 'express'
import checkAddProjectRequestBody from '../../middleware/check_c-u_req_body'
import CheckAuthenticated from '../../middleware/check_authenticated'
import checkProject from '../../prisma_queries/check_project'
import HttpError from '../../config/http_error'
import EditProject from '../../prisma_queries/update_project'

const editRouter = express.Router()

// route to update a project
editRouter.put('/update', CheckAuthenticated, checkAddProjectRequestBody, async (req: Request, res: Response, next: NextFunction) : Promise<any> => {

    // check if user sent id with request
    if (!req.body['projectDetails'].id) {
        const error = new HttpError('Project id is required', 400)
        return next(error)
    }

    
    // check if project id is valid
    const idCheck = await checkProject({id: req.body['projectDetails'].id})

    // if id doesn't exist, return error message
    if (!idCheck) {
        const error = new HttpError('There is no project for this id', 400)
        return next(error)
    }

    // if valid, edit project
    await EditProject(req.body['projectDetails'].id, req.body)

    return res.json({
        responseMsg: "Project edited successfully!"
    })
})




export default editRouter