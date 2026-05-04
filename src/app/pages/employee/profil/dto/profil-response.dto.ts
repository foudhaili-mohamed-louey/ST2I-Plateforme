export interface ProfilResponseDto {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    sex: 'Male' | 'Female';
    cin?: string;
    hireDate?: Date;
    createdAt?: Date;
    profession?: string;
    roleName?: string;
    roleLevel?: number;
    isSystemRole?: boolean;
    isActive: boolean;
    departmentId?: number;
    departmentName?: string;
    departmentCode?: string;
    email?: string;
    phone?: string;
    photoUrl?: string;
}
