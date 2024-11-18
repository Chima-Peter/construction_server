import { ResourceTypes } from "../../@types/add_project_types";

const CheckResources = (status: string, resources?: ResourceTypes[]) => {

  // Define fields for resources object
    const resourcesFields = [
      'type', 
      'quantity', 
      'cost', 
      'unit'
    ]

    // Define the expected types of resources fields
    const resourcesType = {
      'type': 'string', 
      'quantity': 'number', 
      'cost': 'number', 
      'unit': 'string'
    }

    // resources not required for NOT_STARTED
    if (status === 'NOT_STARTED' && resources === undefined) {
        return {
            responseCode: true,
            responseMsg: "NOT_STARTED doesn't require resources details."
        }
    }

    // For other statuses, ensure resources exists
    if (!resources || resources.length === 0) {
        return {
            responseCode: false,
            responseMsg: "Resources details are missing.",
        };
    }

    // Validate the resources object fields
    for (const resource of resources) {
        for (const field of resourcesFields) {
          const fieldValue = resource[field as keyof ResourceTypes]
          const expectedType = resourcesType[field as keyof typeof resourcesType]

          if (fieldValue === undefined || fieldValue === null) {
            return {
                responseCode: false,
                responseMsg: `Missing resource field ${field}.`
              }
          }

          // check field values of type string
          if (expectedType === 'string' && typeof fieldValue !== 'string') {
              return {
                  responseCode: false,
                  responseMsg: `Field ${fieldValue} must be a string`
              }
          }

              // check field values of type number
              if (expectedType === 'number' && typeof fieldValue !== 'number') {
              return {
                  responseCode: false,
                  responseMsg: `Field ${fieldValue} must be a number`
              }
          }
        }
    }


  // If all resources are valid
  return {
    responseCode: true,
    responseMsg: "All resources are valid",
  };
};

export default CheckResources;
