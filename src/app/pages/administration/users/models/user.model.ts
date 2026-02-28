export type Sex = 'Male' | 'Female';

export interface AppUser {
    idUser: number;
    cin: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    photoUrl?: string;
    sex: Sex;
    hireDate?: string;
    createdAt?: string;
    isActive: boolean;
    profession: string;
    department: string;

    identifiantUnique?: string;
    birthPlace?: string;
    nationality?: string;
    passportNumber?: string;

    residence?: {
        governorate?: string;
        delegation?: string;
        bureau?: string;
        postalCode?: string;
        address?: string;
    };
}
