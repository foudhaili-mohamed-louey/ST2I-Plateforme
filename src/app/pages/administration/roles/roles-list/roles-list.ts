import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { RolesService } from '../services/roles.service';
import { RoleResponseDTO } from '../models/role-models/role-response.dto';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, ToastModule],
  templateUrl: './roles-list.html',
  styleUrls: ['./roles-list.scss'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RolesListComponent implements OnInit {

  roles: RoleResponseDTO[] = [];
  filteredRoles: RoleResponseDTO[] = [];
  searchTerm = '';
  loading = true;
  deleting = false;

  // confirm dialog state
  showConfirm = false;
  roleToDelete: RoleResponseDTO | null = null;

  constructor(
    private rolesService: RolesService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.cd.detectChanges();

    this.rolesService.getRoles().subscribe({
      next: (data) => {
        this.roles = data || [];
        this.filteredRoles = [...this.roles];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading roles', err);
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  searchByName(): void {
    const value = this.searchTerm.trim().toLowerCase();
    if (!value) {
      this.filteredRoles = [...this.roles];
    } else {
      this.filteredRoles = this.roles.filter(r =>
        r.name?.toLowerCase().includes(value)
      );
    }
    this.cd.detectChanges();
  }

  goToCreate(): void {
    this.router.navigate(['/administration/roles/new']);
  }

  goToEdit(name: string): void {
    this.router.navigate(['/administration/roles', name, 'edit']);
  }

  goToDetails(name: string): void {
    this.router.navigate(['/administration/roles', name, 'details']);
  }

  goToPermissions(roleId: number): void {
    this.router.navigate(['/administration/roles', roleId, 'permissions']);
  }

  // ===== OPEN CONFIRM DIALOG =====
  deleteRole(role: RoleResponseDTO): void {
    if (role.isSystemRole) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Interdit',
        detail: 'Impossible de supprimer un rôle système'
      });
      this.cd.detectChanges();
      return;
    }
    this.roleToDelete = role;
    this.showConfirm = true;
    this.cd.detectChanges();
  }

  // ===== CANCEL DELETE =====
  cancelDelete(): void {
    this.roleToDelete = null;
    this.showConfirm = false;
    this.cd.detectChanges();
  }

  // ===== CONFIRM DELETE =====
  confirmDelete(): void {
    if (!this.roleToDelete) return;

    this.deleting = true;
    this.cd.detectChanges();

    this.rolesService.deleteRole(this.roleToDelete.name).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Rôle "${this.roleToDelete?.name}" supprimé avec succès`
        });
        this.showConfirm = false;
        this.roleToDelete = null;
        this.deleting = false;
        this.cd.detectChanges();
        this.loadRoles();
      },
      error: (err) => {
        const message = err?.error?.message || 'Erreur lors de la suppression';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: message
        });
        this.showConfirm = false;
        this.roleToDelete = null;
        this.deleting = false;
        this.cd.detectChanges();
      }
    });
  }
}