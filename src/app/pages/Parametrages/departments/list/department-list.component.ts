import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { DepartmentService } from '../services/department.service';
import { DepartmentResponseDTO } from '../dtos/department-response.dto';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-department-list',
  standalone: true,
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    TooltipModule
  ],
  providers: [MessageService]
})
export class DepartmentListComponent implements OnInit {

  rows: DepartmentResponseDTO[] = [];
  loading = false;

  // confirm delete dialog state
  showDeleteConfirm = false;
  deptToDelete: DepartmentResponseDTO | null = null;
  deleting = false;

  filters = {
    name: '',
    code: '',
    location: '',
    status: ''
  };

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // ===== LOAD ALL =====
  loadAll(): void {
    this.loading = true;
    this.cd.detectChanges();

    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.rows = data;
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cd.detectChanges();
      }
    });
  }

  // ===== SEARCH / FILTER =====
  search(): void {
    this.loading = true;
    this.cd.detectChanges();

    // Priority: name search → code search → status filter → load all
    if (this.filters.name) {
      this.departmentService.searchByName(this.filters.name).subscribe({
        next: (data) => this.applyResult(data),
        error: () => this.handleError()
      });

    } else if (this.filters.code) {
      this.departmentService.getByCode(this.filters.code).subscribe({
        next: (data) => this.applyResult([data]),
        error: () => this.handleError()
      });

    } else if (this.filters.status === 'active') {
      this.departmentService.getActiveDepartments().subscribe({
        next: (data) => this.applyResult(data),
        error: () => this.handleError()
      });

    } else if (this.filters.status === 'inactive') {
      // load all then filter client-side since backend has no inactive endpoint
      this.departmentService.getAll().subscribe({
        next: (data) => this.applyResult(data.filter(d => !d.active)),
        error: () => this.handleError()
      });

    } else {
      this.loadAll();
    }
  }

  private applyResult(data: DepartmentResponseDTO[]): void {
    this.rows = data;
    this.loading = false;
    this.cd.detectChanges();
  }

  private handleError(): void {
    this.loading = false;
    this.cd.detectChanges();
  }

  // ===== RESET =====
  reset(): void {
    this.filters = { name: '', code: '', location: '', status: '' };
    this.loadAll();
  }

  // ===== NAVIGATE =====
  add(): void {
    this.router.navigate(['/departments/new']);
  }

  details(d: DepartmentResponseDTO): void {
    this.router.navigate(['/departments', d.id, 'details']);
  }

  edit(d: DepartmentResponseDTO): void {
    this.router.navigate(['/departments', d.id, 'edit']);
  }

  // ===== OPEN DELETE CONFIRM =====
  delete(d: DepartmentResponseDTO): void {
    this.deptToDelete = d;
    this.showDeleteConfirm = true;
    this.cd.detectChanges();
  }

  // ===== CANCEL DELETE =====
  cancelDelete(): void {
    this.deptToDelete = null;
    this.showDeleteConfirm = false;
    this.cd.detectChanges();
  }

  // ===== CONFIRM DELETE =====
  confirmDelete(): void {
    if (!this.deptToDelete) return;

    this.deleting = true;
    this.cd.detectChanges();

    this.departmentService.deleteDepartment(this.deptToDelete.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Département "${this.deptToDelete?.name}" supprimé`
        });
        this.showDeleteConfirm = false;
        this.deptToDelete = null;
        this.deleting = false;
        this.cd.detectChanges();
        this.loadAll();
      },
      error: (err) => {
        const message = err?.error?.message || 'Erreur lors de la suppression';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: message
        });
        this.showDeleteConfirm = false;
        this.deptToDelete = null;
        this.deleting = false;
        this.cd.detectChanges();
      }
    });
  }

  // ===== TOGGLE ACTIVE / DEACTIVATE =====
  toggleActive(d: DepartmentResponseDTO): void {
    const action$ = d.active
      ? this.departmentService.deactivateDepartment(d.id)
      : this.departmentService.activateDepartment(d.id);

    action$.subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Département "${d.name}" ${d.active ? 'désactivé' : 'activé'}`
        });
        this.loadAll();
      },
      error: (err) => {
        const message = err?.error?.message || 'Erreur lors de la mise à jour';
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: message
        });
        this.cd.detectChanges();
      }
    });
  }

  // ===== EXPORT CSV =====
  export(): void {
    const header = ['ID', 'Nom', 'Code', 'Description', 'Localisation', 'Téléphone', 'Email', 'Employés', 'Statut'];
    const csvRows = this.rows.map(d => [
      d.id,
      d.name,
      d.code,
      d.description,
      d.location,
      d.phoneNumber,
      d.email,
      d.employeeCount,
      d.active ? 'Actif' : 'Inactif'
    ].join(','));

    const csv = [header.join(','), ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'departments.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}