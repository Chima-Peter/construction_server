import { BudgetFields, BudgetTypes } from "../../@types/add_project_types";
import CheckBudgetResources from "./check_budget_resources";

const CheckBudget = (budget: BudgetTypes) => {
    // check parameters for budget
    if (budget) {
        for (const field of BudgetFields) {
            if (!budget[field]) {
                return {
                    responseCode: false,
                    responseMsg: `Missing required field in budget: ${field}`
                }
            }
        }
        const checkResources = CheckBudgetResources(budget.resources)

        if (!checkResources.responseCode) {
            return {
                responseCode: false,
                responseMsg: checkResources.responseMsg
            }
        }
    }
    return {
        responseCode: true,
        responseMsg: "Budget is valid"
    }
}

export default CheckBudget