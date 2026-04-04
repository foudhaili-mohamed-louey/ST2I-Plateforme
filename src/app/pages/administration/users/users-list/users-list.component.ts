import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { UsersService } from '../services/users.service';
import { UserResponseDTO } from '../models/user-response.dto';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class UsersListComponent implements OnInit {

    rows: UserResponseDTO[] = [];
    loading = false;

    // confirm delete dialog state
    showDeleteConfirm = false;
    userToDelete: UserResponseDTO | null = null;
    deleting = false;

    filters = {
        firstName: '',
        lastName: '',
        status: ''
    };

    constructor(
        private usersService: UsersService,
        private router: Router,
        private cd: ChangeDetectorRef,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.loadAll();
    }

    loadAll(): void {
        this.loading = true;
        this.cd.detectChanges();
        this.usersService.getAllUsers().subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
                this.cd.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cd.detectChanges();
            }
        });
    }

    search(): void {
        this.loading = true;
        this.cd.detectChanges();

        let request$;

        if (this.filters.firstName) {
            request$ = this.usersService.searchByFirstName(this.filters.firstName);
        } else if (this.filters.lastName) {
            request$ = this.usersService.searchByLastName(this.filters.lastName);
        } else if (this.filters.status === 'active') {
            request$ = this.usersService.getActiveUsers();
        } else if (this.filters.status === 'inactive') {
            request$ = this.usersService.getInactiveUsers();
        } else {
            return this.loadAll();
        }

        request$.subscribe({
            next: (data) => {
                this.rows = data;
                this.loading = false;
                this.cd.detectChanges();
            },
            error: () => {
                this.loading = false;
                this.cd.detectChanges();
            }
        });
    }

    reset(): void {
        this.filters = { firstName: '', lastName: '', status: '' };
        this.loadAll();
    }

    add(): void {
        this.router.navigate(['/administration/users/new']);
    }

    details(u: UserResponseDTO): void {
        this.router.navigate(['/administration/users', u.id, 'details']);
    }

    edit(u: UserResponseDTO): void {
        this.router.navigate(['/administration/users', u.id, 'edit']);
    }

    // ===== OPEN DELETE CONFIRM =====
    delete(u: UserResponseDTO): void {
        this.userToDelete = u;
        this.showDeleteConfirm = true;
        this.cd.detectChanges();
    }

    // ===== CANCEL DELETE =====
    cancelDelete(): void {
        this.userToDelete = null;
        this.showDeleteConfirm = false;
        this.cd.detectChanges();
    }

    // ===== CONFIRM DELETE =====
    confirmDelete(): void {
        if (!this.userToDelete) return;

        this.deleting = true;
        this.cd.detectChanges();

        this.usersService.deleteUser(this.userToDelete.id).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: `Utilisateur "${this.userToDelete?.firstName} ${this.userToDelete?.lastName}" supprimé`
                });
                this.showDeleteConfirm = false;
                this.userToDelete = null;
                this.deleting = false;
                this.cd.detectChanges();
                this.loadAll();
            },
            error: (err) => {
                const message = err?.error?.message || 'Erreur lors de la suppression';
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: message
                });
                this.showDeleteConfirm = false;
                this.userToDelete = null;
                this.deleting = false;
                this.cd.detectChanges();
            }
        });
    }

    // ===== RESET PASSWORD =====
resetPassword(u: UserResponseDTO): void {

    // frontend guard — block immediately if email not verified
    // avoids unnecessary API call and gives instant feedback
    if (!u.emailVerified) {
        this.messageService.add({
            severity: 'warn',
            summary: 'Email non vérifié',
            detail: `Impossible d'envoyer l'email — ${u.firstName} ${u.lastName} doit d'abord vérifier son adresse email`,
            life: 6000
        });
        this.cd.detectChanges();
        return;
    }

    this.usersService.resetUserPassword(u.id).subscribe({
        next: () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Email envoyé',
                detail: `Un email de réinitialisation a été envoyé à ${u.email}`,
                life: 5000
            });
            this.cd.detectChanges();
        },
        error: (err) => {
            // 409 — backend confirmed email not verified (double safety net)
            const detail = err?.status === 409
                ? err?.error?.message || 'L\'email de l\'utilisateur n\'est pas encore vérifié'
                : err?.error?.message || 'Erreur lors de la réinitialisation du mot de passe';

            this.messageService.add({
                severity: err?.status === 409 ? 'warn' : 'error',
                summary: err?.status === 409 ? 'Email non vérifié' : 'Erreur',
                detail,
                life: 6000
            });
            this.cd.detectChanges();
        }
    });
}

    export(): void {
        const header = ['ID', 'Prénom', 'Nom', 'Profession', 'Email', 'Téléphone', 'Rôle', 'Statut'];
        const rows = this.rows.map(u => [
            u.id,
            u.firstName,
            u.lastName,
            u.profession,
            u.email,
            u.phone,
            u.roleName,
            u.isActive ? 'Actif' : 'Inactif'
        ].join(','));
        const csv = [header.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        a.click();
        URL.revokeObjectURL(url);
    }
}