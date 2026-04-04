import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { RolesService } from '../../roles/services/roles.service';
import { DepartmentService } from '../../../departments/services/department.service';
import { UserCreateDTO } from '../models/user-create.dto';
import { RoleResponseDTO } from '../../roles/models/role-models/role-response.dto';
import { DepartmentResponseDTO } from '../../../departments/dtos/department-response.dto';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

// roles that are NOT assigned to any department
const FREE_ROLES = ['ADMIN', 'SUPER_ADMIN'];

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, ToastModule],
  providers: [MessageService]
})
export class UserFormComponent implements OnInit {

  sexOptions: ('Male' | 'Female')[] = ['Male', 'Female'];
  manageableRoles: RoleResponseDTO[] = [];
  departments: DepartmentResponseDTO[] = [];

  rolesLoading = false;
  departmentsLoading = false;
  saving = false;

  // controls department dropdown visibility
  showDepartment = false;

  form: UserCreateDTO = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
    cin: '',
    phone: '',
    photoUrl: '',
    sex: 'Male',
    hireDate: '',
    profession: '',
    roleMetadataId: 0,
    departmentId: undefined
  };

  constructor(
    private router: Router,
    private usersService: UsersService,
    private rolesService: RolesService,
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadManageableRoles();
    this.loadDepartments();
  }

  // ===== LOAD ROLES =====
  loadManageableRoles(): void {
    this.rolesLoading = true;
    this.cd.detectChanges();

    this.rolesService.getManageableRoles().subscribe({
      next: (roles) => {
        this.manageableRoles = roles;
        this.rolesLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load roles', err);
        this.rolesLoading = false;
        this.cd.detectChanges();
      }
    });
  }

  // ===== LOAD ACTIVE DEPARTMENTS =====
  loadDepartments(): void {
    this.departmentsLoading = true;
    this.cd.detectChanges();

    this.departmentService.getActiveDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.departmentsLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load departments', err);
        this.departmentsLoading = false;
        this.cd.detectChanges();
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

    this.cd.detectChanges();
  }

  // ===== SAVE =====
  save(): void {
    if (!this.form.username.trim()) {
      this.showError('Le nom d\'utilisateur est requis');
      return;
    }
    if (!this.form.firstName.trim()) {
      this.showError('Le prénom est requis');
      return;
    }
    if (!this.form.lastName.trim()) {
      this.showError('Le nom est requis');
      return;
    }
    if (!this.form.email.trim()) {
      this.showError('L\'email est requis');
      return;
    }
    if (!this.form.cin.trim()) {
      this.showError('Le CIN est requis');
      return;
    }
    if (!this.form.phone.trim()) {
      this.showError('Le téléphone est requis');
      return;
    }
    if (!this.form.hireDate) {
      this.showError('La date d\'embauche est requise');
      return;
    }
    if (!this.form.profession.trim()) {
      this.showError('La profession est requise');
      return;
    }
    if (!this.form.roleMetadataId) {
      this.showError('Le rôle est requis');
      return;
    }
    // department required only if role is not ADMIN/SUPER_ADMIN
    if (this.showDepartment && !this.form.departmentId) {
      this.showError('Le département est requis pour ce rôle');
      return;
    }

    this.saving = true;
    this.cd.detectChanges();

    this.usersService.createUser(this.form).subscribe({
      next: () => {
        this.saving = false;
        this.cd.detectChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Utilisateur créé avec succès',
          life: 3000
        });
        setTimeout(() => this.back(), 1500);
      },
      error: (err) => {
        console.error('Failed to create user', err);
        this.saving = false;
        this.cd.detectChanges();
        this.showError(
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Erreur lors de la création de l\'utilisateur'
        );
      }
    });
  }

  // ===== HELPERS =====
  private showError(detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail,
      life: 5000
    });
    this.cd.detectChanges();
  }

  back(): void {
    this.router.navigate(['/administration/users']);
  }
}