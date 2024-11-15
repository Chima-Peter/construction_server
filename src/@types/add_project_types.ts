export interface ResourceTypes {
    name: string,
    units: string,
    spent: string,
    quantity: string
}

export interface BudgetResourceTypes {
    create: Array<{
        name: string,
        units: string,
        spent: string,
    }>
}

export interface BudgetTypes {
    totalBudget: string,
    quantity: string
    resources: BudgetResourceTypes
}

export enum Status {
    NotStarted = "NOT_STARTED",
    Planning = "PLANNING",
    Paused = "PAUSED",
    Cancelled = "CANCELLED",
    NearCompletion = "NEAR_COMPLETION",
    InProgress = "IN_PROGRESS",
    Completed = "COMPLETE"
}

export interface ProjectDetailsTypes {
    name: string,
    manager: string,
    progress: number,
    status: Status,
    startDate: string,
    endDate: string,
    keyDetails: string[],
    milestones: string[]
}

export interface Project {
    projectDetails: ProjectDetailsTypes,
    budget: BudgetTypes,
    resources: ResourceTypes[]
}


// fields to validate for status: NOT STARTED
export const Not_Started = [ 'name', 'manager', 'status' ]

// fields to validate for status: PLANNING
export const Planning = [ 'name', 'manager', 'status', 'keyDetails', 'milestones' ]

// fields to validate for status: IN PROGRESS, NEAR COMPLETION, COMPLETED
export const Others = [ 'name', 'manager', 'status', 'startDate', 'endDate', 'progress', 'keyDetails', 'milestones', ]

// fields to validate for status: PAUSED
export const Paused = [ 'name', 'manager', 'status', 'startDate', 'progress', 'keyDetails', 'milestones' ]

// fields to validate for status: CANCELLED
export const Cancelled = [ 'name', 'manager', 'status' ]

export const ResourcesFields: (keyof ResourceTypes)[] = [ 'name', 'units', 'spent', 'quantity' ]

export const BudgetResourceFields: (keyof Pick<ResourceTypes, 'name' | 'units' | 'spent'>)[] = [ 'name', 'units', 'spent' ]

export const BudgetFields: (keyof BudgetTypes)[] = [ 'quantity', 'totalBudget', 'resources' ]
