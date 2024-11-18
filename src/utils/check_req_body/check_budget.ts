import { BudgetTypes } from "../../@types/add_project_types";

const CheckBudget = (status: string, budget?: BudgetTypes) => {
    const budgetFields = ['estimated', 'spent', 'remaining']

    // budget not required for NOT_STARTED
    if (status === 'NOT_STARTED' && budget === undefined) {
        return {
            responseCode: true,
            responseMsg: "NOT_STARTED doesn't require budget details."
        }
    }

     // For other statuses, ensure budget exists
    if (!budget) {
        return {
            responseCode: false,
            responseMsg: "Budget details are missing.",
        };
    }

    // if budget exists both for NOT_STARTED and OTHER status
    for (const field of budgetFields) {
        const fieldValue = budget[field as keyof BudgetTypes]

        // check if field value exits
        if (fieldValue === undefined || fieldValue === null) {
            return {
                responseCode: false,
                responseMsg: `Budget field ${field} is missing.`
            }
        }
        if (typeof fieldValue !== 'number') {
            return {
                responseCode: false,
                responseMsg: `Budget field ${field} must be a number.`
            }
        }
    }
    return {
        responseCode: true,
        responseMsg: "Budget is valid"
    }
}

export default CheckBudget