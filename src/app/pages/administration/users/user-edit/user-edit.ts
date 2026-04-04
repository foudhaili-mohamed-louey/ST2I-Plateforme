import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { RolesService } from '../../roles/services/roles.service';
import { DepartmentService } from '../../../departments/services/department.service';
import { UserAdminUpdateDTO } from '../models/user-admin-update.dto';
import { UserResponseDTO } from '../models/user-response.dto';
import { RoleResponseDTO } from '../../roles/models/role-models/role-response.dto';
import { DepartmentResponseDTO } from '../../../departments/dtos/department-response.dto';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// roles that are NOT assigned to any department
const FREE_ROLES = ['ADMIN', 'SUPER_ADMIN'];

@Component({
  selector: 'app-user-edit',
  standalone: true,
  templateUrl: './user-edit.html',
  styleUrls: ['./user-edit.scss'],
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule],
  providers: [MessageService]
})
export class UserEditComponent implements OnInit {

  userId!: string;
  loading = true;
  saving = false;
  rolesLoading = false;
  departmentsLoading = false;

  today = new Date().toISOString().split('T')[0];
  sexOptions: ('Male' | 'Female')[] = ['Male', 'Female'];
  manageableRoles: RoleResponseDTO[] = [];
  departments: DepartmentResponseDTO[] = [];

  // controls department dropdown visibility
  showDepartment = false;

  form: UserAdminUpdateDTO = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    photoUrl: '',
    sex: 'Male',
    hireDate: '',
    profession: '',
    isActive: true,
    roleMetadataId: 0,
    departmentId: undefined
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private rolesService: RolesService,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/administration/users']);
      return;
    }

    this.userId = id;

    // load roles, departments and user data in parallel
    this.loadManageableRoles();
    this.loadDepartments();
    this.loadUser();
  }

  // ===== LOAD ROLES =====
  loadManageableRoles(): void {
    this.rolesLoading = true;
    this.rolesService.getManageableRoles().subscribe({
      next: (roles) => {
        this.manageableRoles = roles;
        this.rolesLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load roles', err);
        this.rolesLoading = false;
      }
    });
  }

  // ===== LOAD ACTIVE DEPARTMENTS =====
  loadDepartments(): void {
    this.departmentsLoading = true;
    this.departmentService.getActiveDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.departmentsLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load departments', err);
        this.departmentsLoading = false;
      }
    });
  }

  // ===== LOAD USER — pre-fill form including department =====
  loadUser(): void {
    this.usersService.getUserById(this.userId).subscribe({
      next: (u: UserResponseDTO) => {
        this.form = {
          firstName: u.firstName ?? '',
          lastName: u.lastName ?? '',
          email: u.email ?? '',
          phone: u.phone ?? '',
          photoUrl: u.photoUrl ?? '',
          sex: this.parseSex(u.sex),
          hireDate: u.hireDate ?? '',
          profession: u.profession ?? '',
          isActive: u.isActive ?? true,
          roleMetadataId: u.roleMetadataId ?? 0,
          // pre-fill department from response
          departmentId: u.departmentId ?? undefined
        };

        // show department dropdown only if user has a non-free role
        const roleName = u.roleName?.toUpperCase() ?? '';
        this.showDepartment = !FREE_ROLES.includes(roleName);

        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.router.navigate(['/administration/users']);
      }
    });
  }

  // ===== ROLE CHANGE — show/hide department dropdown =====
  onRoleChange(roleId: number): void {
    const selected = this.manageableRoles.find(r => r.id === roleId);

    if (selected && FREE_ROLES.includes(selected.name.toUpperCase())) {
      // ADMIN or SUPER_ADMIN — no department needed
      this.showDepartment = false;
      this.form.departmentId = undefined;
    } else {
      // all other roles — department required
      this.showDepartment = true;
    }

    this.cdr.markForCheck();
  }

  // ===== SAVE =====
  save(formRef: NgForm): void {
    if (formRef.invalid) return;

    if (!this.form.roleMetadataId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le rôle est requis',
        life: 5000
      });
      return;
    }

    // department required only if role is not ADMIN/SUPER_ADMIN
    if (this.showDepartment && !this.form.departmentId) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Le département est requis pour ce rôle',
        life: 5000
      });
      return;
    }

    this.saving = true;
    this.usersService.updateUserAsAdmin(this.userId, this.form).subscribe({
      next: () => {
        this.saving = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur modifié avec succès',
          life: 3000
        });
        setTimeout(() => this.back(), 1500);
      },
      error: (err) => {
        console.error('Update failed', err);
        this.saving = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err?.error?.message ||
                  err?.error?.error ||
                  err?.message ||
                  'Erreur lors de la modification de l\'utilisateur',
          life: 5000
        });
      }
    });
  }

  // ===== HELPERS =====
  private parseSex(value?: string): 'Male' | 'Female' {
    return value === 'Female' ? 'Female' : 'Male';
  }

  back(): void {
    this.router.navigate(['/administration/users']);
  }
}