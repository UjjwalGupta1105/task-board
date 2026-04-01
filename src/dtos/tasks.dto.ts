export type CreateTaskDto = {  
    name: string;
    description: string | null;
    assignedFrom: number;
    assignedTo: number;
    projectId: number;
    statusId?: number;
    deadline?: Date | null;
}