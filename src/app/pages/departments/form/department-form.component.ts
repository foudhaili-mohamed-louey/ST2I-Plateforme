import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DepartmentsService } from '../services/departments.service';
import { Department } from '../models/department.model';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-department-form',
    standalone: true,
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.scss'],
    imports: [CommonModule, FormsModule, Button, InputText, Checkbox]
})
export class DepartmentFormComponent implements OnInit {
    isEdit = false;
    id?: number;

    form: Department = {
        idDepartment: 0,
        name: '',
        code: '',
        description: '',
        local: '',
        phoneNumber: '',
        email: '',
        isActive: true,
        employeeCount: 0
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private deptService: DepartmentsService
    ) {}

    ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('id');
        this.isEdit = !!idParam;

        if (this.isEdit) {
            this.id = Number(idParam);
            this.deptService.getById(this.id).subscribe((d) => {
                if (!d) return;
                this.form = JSON.parse(JSON.stringify(d));
            });
        }
    }

    save() {
        if (!this.form.code.trim() || !this.form.name.trim()) {
            alert('Code and Name are required.');
            return;
        }

        if (this.isEdit && this.id != null) {
            this.deptService.update(this.id, this.form).subscribe(() => this.back());
        } else {
            this.deptService.create(this.form).subscribe(() => this.back());
        }
    }

    back() {
        this.router.navigate(['/departments']);
    }
}
