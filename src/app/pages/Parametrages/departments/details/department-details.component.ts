import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { DepartmentService } from '../services/department.service';
import { DepartmentResponseDTO } from '../dtos/department-response.dto';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-department-details',
  standalone: true,
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.scss'],
  imports: [CommonModule, RouterModule, ButtonModule]
})
export class DepartmentDetailsComponent implements OnInit {

  dept?: DepartmentResponseDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.loading = false;
        this.cd.detectChanges();
        return;
      }

      this.departmentService.getById(Number(id)).subscribe({
        next: (data) => {
          this.dept = data;
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error loading department', err);
          this.dept = undefined;
          this.loading = false;
          this.cd.detectChanges();
        }
      });
    });
  }

  // ===== NAVIGATE TO EDIT =====
  edit(): void {
    this.router.navigate(['/departments', this.dept?.id, 'edit']);
  }

  // ===== BACK =====
  back(): void {
    this.router.navigate(['/departments']);
  }
}