import { Request, Response,  NextFunction } from "express"
import HttpError from "../config/http_error"


type requestType = {
  value: string
}

// validate the request body
const checkAuthRequestBody = (requiredFields: requestType[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const requestBody = req.body

    // check if all required fields are present in the request body then either send to error middleware
    for (const field of requiredFields) {
      if (!requestBody[field.value]) {
        const error = new HttpError(`Missing required field: '${field.value}'`, 400)
        return next(error)
      }
    }
    next() // if no error, pass to next middleware or route handler
  }
}

export default checkAuthRequestBody