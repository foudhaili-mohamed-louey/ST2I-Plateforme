import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';

import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';

@Component({
    selector: 'app-project-details',
    standalone: true,
    templateUrl: './project-details.component.html',
    styleUrls: ['./project-details.component.scss'],
    imports: [CommonModule, Button]
})
export class ProjectDetailsComponent implements OnInit {
    project?: Project;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ProjectsService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.service.getById(id).subscribe((p) => (this.project = p));
    }

    back() {
        this.router.navigate(['/administration/projects']);
    }
}
