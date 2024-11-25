import express, { Request, Response, NextFunction } from 'express'
import getAllProjects from '../../prisma_queries/read_projects'
import checkViewRequestBody from '../../middleware/check_read_req_body';
import CheckAuthenticated from '../../middleware/check_authenticated';

const viewRouter = express.Router()


// route to view all projects or view projects based on filters
viewRouter.get('/read', CheckAuthenticated, checkViewRequestBody, async (req: Request, res: Response, _next: NextFunction) => {
    // collect all search fields in request params
    const { id, status, manager, startDate, endDate, progress, page, limit } = req.query;
    const filters: any = {};
    const pagination: any = {};

    if (id) filters.id = id;
    if (status) filters.status = status;
    if (manager) filters.manager = manager;
    if (startDate && endDate) filters.startDate = { gte: startDate, lte: endDate };
    if (progress) filters.progress = { gte: progress };

    // add pagination parameters if provided
    if (page) pagination.page = page;
    if (limit) pagination.limit = limit;

    res.json(await getAllProjects(filters, pagination))
})


export default viewRouter