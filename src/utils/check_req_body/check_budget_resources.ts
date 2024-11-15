import { BudgetResourceFields, BudgetResourceTypes } from "../../@types/add_project_types";

const CheckBudgetResources = (resources: BudgetResourceTypes) => {
  // Validate resources existence and structure
  if (!resources || !resources.create || !Array.isArray(resources.create)) {
    return {
      responseCode: false,
      responseMsg: "Resources in budget must be a valid array.",
    };
  }

  // Validate each resource
  for (let index = 0; index < resources.create.length; index++) {
    const resource = resources.create[index];

    // Validate required fields in the resource
    for (const field of BudgetResourceFields) {
      if (!resource[field as keyof typeof resource]) {
        return {
          responseCode: false,
          responseMsg: `Missing required field in budget resources row ${index + 1}: ${field}`,
        };
      }
    }
  }

  // If all resources are valid
  return {
    responseCode: true,
    responseMsg: "All budget resources are valid.",
  };
};

export default CheckBudgetResources;
