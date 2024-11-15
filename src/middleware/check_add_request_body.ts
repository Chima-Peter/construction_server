import { Request, Response,  NextFunction } from "express"
import HttpError from "../config/http_error"
import CheckProjectDetails from "../utils/check_req_body/check_project_details"
import CheckResources from "../utils/check_req_body/check_resources"
import CheckBudget from "../utils/check_req_body/check_budget"


// validate the request body
const checkAddProjectRequestBody = (req: Request, _res: Response, next: NextFunction) => {
    const requestBody = req.body

    // run the check for correct project request body parameters
    const checkProject = CheckProjectDetails(requestBody['projectDetails'])

    // if check failed, then pass error to error handling middleware
    if (!checkProject.responseCode) {
        const error = new HttpError(checkProject.responseMsg || '', 400)
        return next(error)
    }

    // only validate resources and budgets for status: in progress, near completion and completed
    if (requestBody.projectDetails) {

        // check resources first
        const checkResources = CheckResources(requestBody['resources'])

        if (!checkResources.responseCode) {
            const error = new HttpError(checkResources.responseMsg || '', 400)
            return next(error)
        }

        // check budget next
        const checkBudget = CheckBudget(requestBody['budget'])

        if (!checkBudget.responseCode) {
            const error = new HttpError(checkBudget.responseMsg || '', 400)
            return next(error)
        }
    }
    next() // if no error, pass to next middleware
}

export default checkAddProjectRequestBody