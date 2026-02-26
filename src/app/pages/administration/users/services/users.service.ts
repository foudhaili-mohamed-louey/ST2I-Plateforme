import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
    private users: AppUser[] = [
        {
            idUser: 1,
            cin: '12305896',
            firstName: 'Farah',
            lastName: 'Atallah',
            phone: '20572272',
            email: 'atallah.farah14@gmail.com',
            password: '********',
            photoUrl: '',
            sex: 'Female',
            hireDate: '1999-05-13',
            createdAt: '2026-02-23T15:45:00',
            isActive: true,
            profession: 'Employe',
            identifiantUnique: '261651552202',
            birthPlace: 'Bizerte',
            nationality: 'Tunisian',
            passportNumber: '',
            residence: {
                governorate: 'Tunis',
                delegation: 'EL MENZAH',
                bureau: '',
                postalCode: '',
                address: 'Menzah7'
            }
        },
        {
            idUser: 2,
            cin: '14523698',
            firstName: 'Hassen',
            lastName: 'BenHmida',
            phone: '22114455',
            email: 'hassen.benhmida@st2i.com.tn',
            password: '********',
            sex: 'Male',
            hireDate: '1998-02-10',
            createdAt: '2026-02-23T15:45:00',
            isActive: true,
            profession: 'Agent',
            identifiantUnique: '266787814997',
            nationality: 'Tunisian',
            residence: { governorate: 'Ariana', delegation: 'La Soukra', address: 'Soukra' }
        }
    ];

    getAll(): Observable<AppUser[]> {
        return of([...this.users]);
    }

    getById(idUser: number): Observable<AppUser | undefined> {
        return of(this.users.find((u) => u.idUser === idUser));
    }

    search(filters: { identifiant?: string; firstName?: string; lastName?: string; email?: string }): Observable<AppUser[]> {
        const identifiant = (filters.identifiant || '').trim().toLowerCase();
        const firstName = (filters.firstName || '').trim().toLowerCase();
        const lastName = (filters.lastName || '').trim().toLowerCase();
        const email = (filters.email || '').trim().toLowerCase();

        const result = this.users.filter((u) => {
            const okId = !identifiant || (u.identifiantUnique || '').toLowerCase().includes(identifiant);
            const okFn = !firstName || u.firstName.toLowerCase().includes(firstName);
            const okLn = !lastName || u.lastName.toLowerCase().includes(lastName);
            const okEmail = !email || u.email.toLowerCase().includes(email);
            return okId && okFn && okLn && okEmail;
        });

        return of([...result]);
    }

    create(payload: AppUser): Observable<AppUser> {
        const nextId = this.users.length ? Math.max(...this.users.map((u) => u.idUser)) + 1 : 1;
        const created: AppUser = { ...payload, idUser: nextId, createdAt: new Date().toISOString() };
        this.users.unshift(created);
        return of(created);
    }

    update(idUser: number, payload: AppUser): Observable<AppUser> {
        const idx = this.users.findIndex((u) => u.idUser === idUser);
        if (idx !== -1) this.users[idx] = { ...payload, idUser };
        return of(this.users[idx]);
    }

    delete(idUser: number): Observable<void> {
        this.users = this.users.filter((u) => u.idUser !== idUser);
        return of(void 0);
    }

    exportCsv(rows: AppUser[]): string {
        const header = ['IdentifiantUnique', 'FirstName', 'LastName', 'Email', 'CIN', 'Phone', 'Activ', 'Profession'];
        const lines = rows.map((u) => [u.identifiantUnique || '', u.firstName, u.lastName, u.email, u.cin, u.phone, u.isActive ? 'true' : 'false', u.profession].map((v) => `"${String(v).replaceAll('"', '""')}"`).join(','));

        return [header.join(','), ...lines].join('\n');
    }
}
