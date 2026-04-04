export interface UserResponseDTO {
  // always present from Keycloak
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified?: boolean;
  isActive: boolean;

  // may be null from Keycloak
  createdAt?: string;

  // custom attributes — may be missing
  cin?: string;
  phone?: string;
  photoUrl?: string;
  sex?: 'Male' | 'Female';
  hireDate?: string;
  profession?: string;

  // role info — null if not synced yet
  roleMetadataId?: number;
  roleName?: string;
  roleLevel?: number;
  isSystemRole?: boolean;

  // ===== DEPARTMENT INFO =====
  // null if user is ADMIN or SUPER_ADMIN
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
}