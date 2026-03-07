import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../services/users.service';
import { AppUser } from '../models/user.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    imports: [CommonModule, FormsModule, RouterModule, TableModule, ButtonModule, InputTextModule]
})
export class UsersListComponent implements OnInit {
    rows: AppUser[] = [];
    loading = false;

    filters = { identifiant: '', firstName: '', lastName: '', email: '' };

    constructor(
        private usersService: UsersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll() {
        this.loading = true;
        this.usersService.getAll().subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    search() {
        this.loading = true;
        this.usersService.search(this.filters).subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    reset() {
        this.filters = { identifiant: '', firstName: '', lastName: '', email: '' };
        this.loadAll();
    }

    add() {
        this.router.navigate(['/administration/users/new']);
    }
    details(u: AppUser) {
        this.router.navigate(['/administration/users', u.idUser, 'details']);
    }
    edit(u: AppUser) {
        this.router.navigate(['/administration/users', u.idUser, 'edit']);
    }

    delete(u: AppUser) {
        if (!confirm(`Supprimer ${u.firstName} ${u.lastName} ?`)) return;
        this.usersService.delete(u.idUser).subscribe(() => this.loadAll());
    }

    shield() {
        alert('Sécurité (statique pour le moment)');
    }

    export() {
        const csv = this.usersService.exportCsv(this.rows);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}
