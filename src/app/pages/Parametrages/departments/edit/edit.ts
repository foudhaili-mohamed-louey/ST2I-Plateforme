import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentService } from '../services/department.service';
import { UpdateDepartmentDTO } from '../dtos/update-department.dto';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-department-edit',
  standalone: true,
  templateUrl: './edit.html',
  styleUrls: ['./edit.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ToastModule
  ],
  providers: [MessageService]
})
export class DepartmentEditComponent implements OnInit {

  deptId!: number;
  loading = true;
  saving = false;

  form: UpdateDepartmentDTO = {
    name: '',
    description: '',
    location: '',
    phoneNumber: '',
    email: '',
    active: true,
    employeeCount: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/departments']);
      return;
    }

    this.deptId = Number(id);
    this.loadDepartment();
  }

  // ===== LOAD EXISTING DATA =====
  loadDepartment(): void {
    this.departmentService.getById(this.deptId).subscribe({
      next: (dept) => {
        this.form = {
          name:          dept.name          ?? '',
          description:   dept.description   ?? '',
          location:      dept.location      ?? '',
          phoneNumber:   dept.phoneNumber   ?? '',
          email:         dept.email         ?? '',
          active:        dept.active        ?? true,
          employeeCount: dept.employeeCount ?? 0
        };
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.showError(
          err?.error?.message ||
          err?.error?.error ||
          'Impossible de charger le département'
        );
        this.loading = false;
        this.cd.detectChanges();
        setTimeout(() => this.router.navigate(['/departments']), 2000);
      }
    });
  }

  // ===== SAVE =====
  save(formRef: NgForm): void {
    formRef.control.markAllAsTouched();
    this.cd.detectChanges();

    if (formRef.invalid) {
      this.showError('Veuillez corriger les champs invalides avant de sauvegarder.');
      return;
    }

    this.saving = true;
    this.cd.detectChanges();

    this.departmentService.updateDepartment(this.deptId, this.form).subscribe({
      next: (updated) => {
        this.saving = false;
        this.cd.detectChanges();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `Département "${updated.name}" mis à jour avec succès`,
          life: 3000
        });
        setTimeout(() => this.back(), 1500);
      },
      error: (err) => {
        this.saving = false;
        this.cd.detectChanges();
        this.showError(
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Erreur lors de la mise à jour du département'
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
    this.router.navigate(['/departments']);
  }
}