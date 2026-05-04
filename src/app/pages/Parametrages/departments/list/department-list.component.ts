import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { DepartmentsService } from '../services/departments.service';
import { Department } from '../models/department.model';

import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-departments-list',
    standalone: true,
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.scss'],
    imports: [CommonModule, FormsModule, RouterModule, TableModule, Button, InputText]
})
export class DepartmentsListComponent implements OnInit {
    rows: Department[] = [];
    loading = false;

    filters = { code: '', name: '', local: '', isActive: '' as '' | boolean };

    constructor(
        private deptService: DepartmentsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.deptService.getAll().subscribe((d) => {
            this.rows = d;
            this.loading = false;
        });
    }

    search() {
        this.loading = true;
        this.deptService.search(this.filters).subscribe((d) => {
            this.rows = d;
            this.loading = false;
        });
    }

    reset() {
        this.filters = { code: '', name: '', local: '', isActive: '' };
        this.loadAll();
    }

    add() {
        this.router.navigate(['/departments/new']);
    }
    details(d: Department) {
        this.router.navigate(['/departments', d.idDepartment, 'details']);
    }
    edit(d: Department) {
        this.router.navigate(['/departments', d.idDepartment, 'edit']);
    }

    delete(d: Department) {
        if (!confirm(`Delete department "${d.name}" ?`)) return;
        this.deptService.delete(d.idDepartment).subscribe(() => this.loadAll());
    }

    export() {
        const csv = this.deptService.exportCsv(this.rows);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'departments.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}
