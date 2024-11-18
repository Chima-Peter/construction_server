import { ProjectDetailsTypes } from "../../@types/add_project_types"

// Function to validate project details based on status
const CheckProjectDetails = (requestBody: ProjectDetailsTypes) => {

    // all required fields in project details
    const allRequiredFields = {
        'name': 'string',
        'manager': 'string',
        'status': 'string',
        'userId': 'number',
        'progress': 'number',
        'startDate': 'string',
        'endDate': 'string',
        'keyDetails': 'array',
        'milestones': 'array',
        'cancellationReason': 'string',
        'pauseReason': 'string'
    }

    // variable of all fields
    const searchFields = ['name', 'manager', 'status', 'progress', 'startDate', 'endDate', 'keyDetails', 'milestones', 'createdAt', 'userId']


    // array to holding all fields based on status
    const allFields = {
        'NOT_STARTED': ['name', 'manager', 'status', 'userId'],
        'IN_PROGRESS': ['name', 'manager', 'status', 'userId', 'progress', 'startDate', 'endDate', 'keyDetails', 'milestones'],
        'NEAR_COMPLETION': ['name', 'manager', 'status', 'userId', 'progress', 'startDate', 'endDate', 'keyDetails', 'milestones'],
        'COMPLETED': ['name', 'manager', 'status', 'userId', 'progress', 'startDate', 'endDate', 'keyDetails', 'milestones'],
    }

        // check if status exists in request body
        if (!requestBody.status) {
            return {
                responseCode: false,
                responseMsg: 'Missing required field in project request body: status'
            }
        }

        // Get the required fields for the status
        const requiredFields = allFields[requestBody.status as keyof typeof allFields];

        // check if status is invalid
        if (!requiredFields) {
            return {
            responseCode: false,
            responseMsg: `Invalid status: '${requestBody.status}'`,
            };
        }

    // if status exists,
    for (const requiredField of searchFields) {
        const fieldValue = requestBody[requiredField as keyof ProjectDetailsTypes]
        const expectedType = allRequiredFields[requiredField as keyof typeof allRequiredFields]

        // check all fields that are required for status
        if (requiredFields.includes(requiredField)) {
            // check if field value exists for required fields on that status
            if (fieldValue === undefined || fieldValue === null) {
                return {
                    responseCode: false,
                    responseMsg: `Missing field '${requiredField}', which is a required field for status: '${requestBody.status}'`
                }
            }

            // check field values of type string
            if (expectedType === 'string' && typeof fieldValue !== 'string') {
                return {
                    responseCode: false,
                    responseMsg: `Project field '${requiredField}' must be a string`
                }
            }

                // check field values of type number
                if (expectedType === 'number' && typeof fieldValue !== 'number') {
                return {
                    responseCode: false,
                    responseMsg: `Project field '${requiredField}' must be a number`
                }
            }

                // check field values of type array
                if (expectedType === 'array' && !Array.isArray(fieldValue)) {
                return {
                    responseCode: false,
                    responseMsg: `Project field '${requiredField}' must be an array`
                }
            }
            // check that keydetails they can't be empty
            if (requestBody.keyDetails.length === 0) {
                return {
                    responseCode: false,
                    responseMsg: `Project field keyDetails can't be empty.`
                }
            }
            // check that milestones they can't be empty
            if (requestBody.milestones.length === 0) {
                return {
                    responseCode: false,
                    responseMsg: `Project field milestones can't be empty.`
                }
            }
        } else {
            // check for fields that user might add to request body only if they exist
            if (fieldValue !== undefined && fieldValue !== null) {
                // check field values of type string
                if (expectedType === 'string' && typeof fieldValue !== 'string') {
                    return {
                        responseCode: false,
                        responseMsg: `Project field '${requiredField}' must be a string`
                    }
                }

                    // check field values of type number
                    if (expectedType === 'number' && typeof fieldValue !== 'number') {
                        return {
                            responseCode: false,
                            responseMsg: `Project field '${requiredField}' must be a number`
                        }
                    }
                    // check field values of type array
                    if (expectedType === 'array' && !Array.isArray(fieldValue)) {
                        return {
                            responseCode: false,
                            responseMsg: `Project field '${requiredField}' must be an array`
                        }
                    }
                    // check that keydetails they can't be empty
                    if (requestBody.keyDetails.length === 0) {
                        return {
                            responseCode: false,
                            responseMsg: `Project field keyDetails can't be empty.`
                        }
                    }
                    // check that milestones they can't be empty
                    if (requestBody.milestones.length === 0) {
                        return {
                            responseCode: false,
                            responseMsg: `Project field milestones can't be empty.`
                        }
                    }
                }        
            }
        }

    // if all fields are valid, return true
    return {
        responseCode: true,
        responseMsg: 'Project details are valid'
    }
}


export default CheckProjectDetails