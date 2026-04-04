import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Checkbox } from 'primeng/checkbox';

import { ProjectsService } from '../services/projects.service';
import { ProjectCreateDto } from '../models/dto/project-create.dto';

@Component({
    selector: 'app-project-form',
    standalone: true,
    templateUrl: './project-form.component.html',
    styleUrls: ['./project-form.component.scss'],
    imports: [CommonModule, FormsModule, RouterModule, Button, InputText, Checkbox]
})
export class ProjectFormComponent {
    form: ProjectCreateDto = {
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
        private service: ProjectsService,
        private router: Router
    ) {}

    save() {
        if (!this.form.name.trim() || !this.form.code.trim()) {
            alert('Nom et Code sont obligatoires.');
            return;
        }
        this.service.create(this.form).subscribe(() => this.back());
    }

    back() {
        this.router.navigate(['/administration/projects']);
    }
}
