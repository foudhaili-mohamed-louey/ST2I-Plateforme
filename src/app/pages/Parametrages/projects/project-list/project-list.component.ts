import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';

import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { Tooltip } from "primeng/tooltip";

@Component({
    selector: 'app-project-list',
    standalone: true,
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    imports: [CommonModule, FormsModule, RouterModule, TableModule, Button, InputText, Tooltip]
})
export class ProjectListComponent implements OnInit {
    rows: Project[] = [];
    loading = false;

    filters = { name: '', code: '', clientName: '', isActive: '' as '' | boolean };

    constructor(
        private service: ProjectsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.service.getAll().subscribe((d) => {
            this.rows = d;
            this.loading = false;
        });
    }

    search() {
        this.loading = true;
        this.service.search(this.filters).subscribe((d) => {
            this.rows = d;
            this.loading = false;
        });
    }

    reset() {
        this.filters = { name: '', code: '', clientName: '', isActive: '' };
        this.loadAll();
    }

    add() {
        this.router.navigate(['/administration/projects/new']);
    }
    details(p: Project) {
        this.router.navigate(['/administration/projects', p.idProject, 'details']);
    }
    edit(p: Project) {
        this.router.navigate(['/administration/projects', p.idProject, 'edit']);
    }

    delete(p: Project) {
        if (!confirm(`Supprimer le projet "${p.name}" ?`)) return;
        this.service.delete(p.idProject).subscribe(() => this.loadAll());
    }

    export() {
        const csv = this.service.exportCsv(this.rows);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'projects.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}
