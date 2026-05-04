import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
    standalone: true,
    selector: 'app-employee-requests-widget',
    imports: [CommonModule, TableModule, TagModule],
    template: `
        <div class="card">
            <div class="font-semibold text-xl mb-4">Historique des demandes</div>

            <p-table [value]="requests" responsiveLayout="scroll">
                <ng-template pTemplate="header">
                    <tr>
                        <th>Date</th>
                        <th>Type de demande</th>
                        <th>Description</th>
                        <th>Réponse</th>
                    </tr>
                </ng-template>

                <ng-template pTemplate="body" let-request>
                    <tr>
                        <td>{{ request.date }}</td>
                        <td>{{ request.type }}</td>
                        <td>{{ request.description }}</td>
                        <td>
                            <p-tag [value]="request.status" [severity]="getSeverity(request.status)"> </p-tag>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `
})
export class EmployeeRequestsWidget {
    requests = [
        {
            date: '12/05/2026',
            type: 'Demande de congé',
            description: 'Congé annuel du 20/05 au 22/05',
            status: 'Acceptée'
        },
        {
            date: '03/05/2026',
            type: 'Demande administrative',
            description: 'Attestation de travail',
            status: 'En attente'
        },
        {
            date: '22/04/2026',
            type: "Demande d'absence",
            description: 'Absence justifiée',
            status: 'Refusée'
        }
    ];

    getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' {
        switch (status) {
            case 'Acceptée':
                return 'success';
            case 'En attente':
                return 'warn';
            case 'Refusée':
                return 'danger';
            default:
                return 'info';
        }
    }
}
