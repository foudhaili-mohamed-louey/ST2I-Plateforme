import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project.model';
import { ProjectCreateDto } from '../models/dto/project-create.dto';
import { ProjectUpdateDto } from '../models/dto/project-update.dto';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private projects: Project[] = [
        {
            idProject: 1,
            name: 'Project Alpha',
            code: 'ALPHA',
            description: 'First project',
            startDate: '2026-03-01',
            endDate: '2026-06-30',
            budget: 50000,
            clientName: 'Client A',
            isActive: true
        },
        {
            idProject: 2,
            name: 'Project Beta',
            code: 'BETA',
            description: 'Second project',
            startDate: '2026-02-01',
            endDate: '2026-04-30',
            budget: 18000,
            clientName: 'Client B',
            isActive: false
        }
    ];

    getAll(): Observable<Project[]> {
        return of([...this.projects]);
    }

    getById(id: number): Observable<Project | undefined> {
        return of(this.projects.find((p) => p.idProject === id));
    }

    search(filters: { name?: string; code?: string; clientName?: string; isActive?: '' | boolean }): Observable<Project[]> {
        const name = (filters.name || '').trim().toLowerCase();
        const code = (filters.code || '').trim().toLowerCase();
        const client = (filters.clientName || '').trim().toLowerCase();
        const active = filters.isActive ?? '';

        const result = this.projects.filter((p) => {
            const okName = !name || p.name.toLowerCase().includes(name);
            const okCode = !code || p.code.toLowerCase().includes(code);
            const okClient = !client || p.clientName.toLowerCase().includes(client);
            const okActive = active === '' || p.isActive === active;
            return okName && okCode && okClient && okActive;
        });

        return of([...result]);
    }

    create(dto: ProjectCreateDto): Observable<Project> {
        const nextId = this.projects.length ? Math.max(...this.projects.map((p) => p.idProject)) + 1 : 1;
        const created: Project = { idProject: nextId, ...dto };
        this.projects.unshift(created);
        return of(created);
    }

    update(id: number, dto: ProjectUpdateDto): Observable<Project> {
        const idx = this.projects.findIndex((p) => p.idProject === id);
        if (idx !== -1) this.projects[idx] = { idProject: id, ...dto };
        return of(this.projects[idx]);
    }

    delete(id: number): Observable<void> {
        this.projects = this.projects.filter((p) => p.idProject !== id);
        return of(void 0);
    }

    exportCsv(rows: Project[]): string {
        const header = ['Code', 'Name', 'Client', 'StartDate', 'EndDate', 'Budget', 'Active'];
        const lines = rows.map((p) => [p.code, p.name, p.clientName, p.startDate, p.endDate, p.budget, p.isActive ? 'true' : 'false'].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','));
        return [header.join(','), ...lines].join('\n');
    }
}
