import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';

import { ProjectsService } from '../services/projects.service';
import { ProjectUpdateDto } from '../models/dto/project-update.dto';

@Component({
    selector: 'app-project-edit',
    standalone: true,
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.scss'],
    imports: [CommonModule, FormsModule, RouterModule, Button, InputText, Checkbox]
})
export class ProjectEditComponent implements OnInit {
    id!: number;

    form: ProjectUpdateDto = {
        name: '',
        code: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: 0,
        clientName: '',
        isActive: true
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectsService
    ) {}

    ngOnInit(): void {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.service.getById(this.id).subscribe((p) => {
            if (!p) return;
            this.form = {
                name: p.name,
                code: p.code,
                description: p.description,
                startDate: p.startDate,
                endDate: p.endDate,
                budget: p.budget,
                clientName: p.clientName,
                isActive: p.isActive
            };
        });
    }

    save() {
        if (!this.form.name.trim() || !this.form.code.trim()) {
            alert('Nom et Code sont obligatoires.');
            return;
        }
        this.service.update(this.id, this.form).subscribe(() => this.back());
    }

    back() {
        this.router.navigate(['/administration/projects']);
    }
}
