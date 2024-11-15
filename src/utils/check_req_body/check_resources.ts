import { ResourcesFields, ResourceTypes } from "../../@types/add_project_types";

const CheckResources = (resources: ResourceTypes[]) => {
  // Check if resources exist and are valid
  if (resources && resources.length > 0) {
    for (let index = 0; index < resources.length; index++) {
      const resource = resources[index];
      for (const field of ResourcesFields) {
        if (!resource[field as keyof ResourceTypes]) {
          return {
            responseCode: false,
            responseMsg: `Missing required field in resources row ${index + 1}: ${field}`,
          };
        }
      }
    }
  } else {
    // Resources does not exist or is empty
    return {
      responseCode: false,
      responseMsg: `Resources can't be empty`,
    };
  }

  // If all resources are valid
  return {
    responseCode: true,
    responseMsg: "All resources are valid",
  };
};

export default CheckResources;
