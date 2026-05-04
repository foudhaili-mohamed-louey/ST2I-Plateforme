export interface CongeRequestDto {
    leaveTypeId: number;
    startDate: string;
    endDate: string;
    reason: string;
    description?: string;
}
