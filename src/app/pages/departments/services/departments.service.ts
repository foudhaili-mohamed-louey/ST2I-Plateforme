import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({ providedIn: 'root' })
export class DepartmentsService {
    private depts: Department[] = [
        {
            idDepartment: 1,
            name: 'Human Resources',
            code: 'HR',
            description: 'Personnel management and development',
            local: 'Bloc A',
            phoneNumber: '71123456',
            email: 'hr@st2i.com.tn',
            isActive: true,
            employeeCount: 12
        },
        {
            idDepartment: 2,
            name: 'Information Technology',
            code: 'IT',
            description: 'Support & maintenance of IT infrastructure',
            local: 'Bloc B',
            phoneNumber: '71222333',
            email: 'it@st2i.com.tn',
            isActive: true,
            employeeCount: 20
        },
        {
            idDepartment: 3,
            name: 'Marketing',
            code: 'MK',
            description: 'Communication & promotion',
            local: 'Bloc C',
            phoneNumber: '71333444',
            email: 'marketing@st2i.com.tn',
            isActive: true,
            employeeCount: 5
        },
        {
            idDepartment: 4,
            name: 'Finance',
            code: 'FI',
            description: 'Financial planning, management and reporting',
            local: 'Bloc D',
            phoneNumber: '71444555',
            email: 'finance@st2i.com.tn',
            isActive: true,
            employeeCount: 8
        },
    ];

    getAll(): Observable<Department[]> {
        return of([...this.depts]);
    }

    getById(id: number): Observable<Department | undefined> {
        return of(this.depts.find((d) => d.idDepartment === id));
    }

    search(filters: any): Observable<Department[]> {
        const f = {
            code: (filters.code || '').trim().toLowerCase(),
            name: (filters.name || '').trim().toLowerCase(),
            local: (filters.local || '').trim().toLowerCase(),
            isActive: filters.isActive ?? '' // '', true, false
        };

        const result = this.depts.filter((d) => {
            const okCode = !f.code || d.code.toLowerCase().includes(f.code);
            const okName = !f.name || d.name.toLowerCase().includes(f.name);
            const okLocal = !f.local || d.local.toLowerCase().includes(f.local);
            const okActive = f.isActive === '' || d.isActive === f.isActive;
            return okCode && okName && okLocal && okActive;
        });

        return of([...result]);
    }

    create(payload: Department): Observable<Department> {
        const nextId = this.depts.length ? Math.max(...this.depts.map((d) => d.idDepartment)) + 1 : 1;
        const created: Department = { ...payload, idDepartment: nextId };
        this.depts.unshift(created);
        return of(created);
    }

    update(id: number, payload: Department): Observable<Department> {
        const idx = this.depts.findIndex((d) => d.idDepartment === id);
        if (idx !== -1) this.depts[idx] = { ...payload, idDepartment: id };
        return of(this.depts[idx]);
    }

    delete(id: number): Observable<void> {
        this.depts = this.depts.filter((d) => d.idDepartment !== id);
        return of(void 0);
    }

    exportCsv(rows: Department[]): string {
        const header = ['Code', 'Nom', 'Local', 'Email', 'Téléphone', 'Actif', 'Employés'];
        const lines = rows.map((d) => [d.code, d.name, d.local, d.email, d.phoneNumber, d.isActive ? 'true' : 'false', d.employeeCount].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','));
        return [header.join(','), ...lines].join('\n');
    }
}
