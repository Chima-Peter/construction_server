export interface ResourceTypes {
    type: string,
    quantity: number,
    cost: number,
    unit: string
}


export interface BudgetTypes {
    estimated: number,
    spent: number,
    remaining: number
    
}

export interface ProjectDetailsTypes {
    name: string,
    manager: string,
    progress: number,
    userId: number,
    status: string,
    startDate: string,
    endDate: string,
    keyDetails: string[],
    milestones: string[],
    createdAt: string,
    updatedAt: string,
    cancellationReason: string,
    pauseReason: string
}

export interface Project {
    projectDetails: ProjectDetailsTypes,
    budget: BudgetTypes,
    resources: ResourceTypes[]
}

