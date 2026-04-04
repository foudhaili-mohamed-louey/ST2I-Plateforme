export interface ProjectCreateDto {
    name: string;
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    budget: number;
    clientName: string;
    isActive: boolean;
}
