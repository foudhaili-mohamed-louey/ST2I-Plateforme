import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentsService } from '../services/departments.service';
import { Department } from '../models/department.model';

import { Button } from 'primeng/button';

@Component({
    selector: 'app-department-details',
    standalone: true,
    templateUrl: './department-details.component.html',
    styleUrls: ['./department-details.component.scss'],
    imports: [CommonModule, Button]
})
export class DepartmentDetailsComponent implements OnInit {
    dept?: Department;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private deptService: DepartmentsService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.deptService.getById(id).subscribe((d) => (this.dept = d));
    }

    back() {
        this.router.navigate(['/departments']);
    }
}
