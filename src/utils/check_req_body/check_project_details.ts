import { Not_Started, Planning, Paused, Cancelled, Others, ProjectDetailsTypes, Status } from "../../@types/add_project_types"

const CheckProjectDetails = (requestBody: ProjectDetailsTypes) => {
    let requiredFields = []

        // check if status exists in request body
        if (!requestBody.status) {
            return {
                responseCode: false,
                responseMsg: 'Missing required field in project request body: status'
            }
        }

         // determine the fields to validate based on the status
        switch (requestBody.status) {
          case Status.NotStarted:
            requiredFields = Not_Started as (keyof ProjectDetailsTypes)[];
            break;
          case Status.Planning:
            requiredFields = Planning as (keyof ProjectDetailsTypes)[];
            break;
          case Status.Cancelled:
            requiredFields = Paused as (keyof ProjectDetailsTypes)[];
            break;
          case Status.Paused:
            requiredFields = Cancelled as (keyof ProjectDetailsTypes)[];
            break;
          default:
            requiredFields = Others as (keyof ProjectDetailsTypes)[];
            break;
        }
        

    // check that all project details fields are present in request body, else return an error
    for (const field of requiredFields) {
        if (!requestBody[field]) {
            return {
                responseCode: false,
                responseMsg: `Missing required field in project request body: ${field}`
            }
        }
    }

    // validate project details and milestones if status !== CANCELLED or NOT STARTED
    if (requestBody.status !== Status.Cancelled && requestBody.status !== Status.NotStarted) {
        if (requestBody.keyDetails.length <= 0) {
            return {
                responseCode: false,
                responseMsg: 'Project key details are required'
            }
        }  
        if (requestBody.milestones.length <= 0) {
            return {
                responseCode: false,
                responseMsg: 'Project milestones are required'
            }
        }
    }
    return {
        responseCode: true,
        responseMsg: 'Project details are valid'
    }
}


export default CheckProjectDetails