import { Request, Response, NextFunction } from "express"
import HttpError from "../config/http_error"

// validate that query in req.query is valid and of right type
const checkViewRequestBody = (req: Request, _res: Response, next: NextFunction) => {
    // all searchable fields in project details
    const allSearchableFields = {
        'id': 'number',
        'name': 'string',
        'manager': 'string',
        'status': 'string',
        'userId': 'number',
        'progress': 'number',
        'startDate': 'string',
        'endDate': 'string',
        'page': 'number',
        'limit': 'number',
    }
    const temp = req.query

    for (let query in temp) {
        const searchField = allSearchableFields[query as keyof typeof allSearchableFields]

        // check if the query is a valid searchable field
        if (!searchField) {
            const error = new HttpError(`Invalid search query: '${query}'`, 400)
            return next(error)
        }

        // convert value that should be numbers back to numbers
        if (searchField === 'number') {
            const value = temp[query] as string
            const parsedValue = parseInt(value, 10)

            // safely check if the value can be converted
            if (isNaN(parsedValue)) {
                const error = new HttpError(`Invalid value for '${query}', expected a number`, 400)
                return next(error)
            }

            temp[query] = parsedValue as any // assign the parsed number to the query
        }
    }

    // check that page and limit are positive integers
    const page = temp['page'] as any
    const limit = temp['limit'] as any

    if (page && page <= 0) {
        const error = new HttpError('Page must be a positive integer', 400)
        return next(error)
    }
    if (limit && limit <= 0) {
        const error = new HttpError('Limit must be a positive integer', 400)
        return next(error)
    }
    req.query = temp // update req.query with validated values
    next()
}

export default checkViewRequestBody