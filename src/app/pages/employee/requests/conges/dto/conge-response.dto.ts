export interface CongeResponseDto {
    id: number;
    leaveTypeName: string;
    startDate: string;
    endDate: string;
    reason: string;
    description?: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
    createdAt: string;
}
