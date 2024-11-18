import express, { Request, Response, NextFunction } from 'express'
import HttpError from '../../config/http_error'
import CheckAuthenticated from '../../middleware/check_authenticated'
import deleteProject from '../../prisma_queries/delete_project'

const deleteRouter = express.Router()


// route to delete a project
deleteRouter.get('/delete',  CheckAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    // check for id in request params
    const { id } = req.query
    if (!id) {
        const error = new HttpError('Project id is required', 400)
        return next(error)
    }

    // safely convert and check if id can be converted
    const parsedID = parseInt(id as string, 10)
    
    if (isNaN(parsedID)) {
        const error = new HttpError(`Invalid value for 'id', expected a number`, 400)
        return next(error)
    }

    // call delete prisma query
    await deleteProject(parsedID)


    res.json({
        responseMsg: 'Project has been successfully deleted'
    })
})


export default deleteRouter