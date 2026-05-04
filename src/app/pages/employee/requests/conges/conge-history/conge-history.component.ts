import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { CongeResponseDto } from '../dto/conge-response.dto';

@Component({
    selector: 'app-conge-history',
    standalone: true,
    imports: [CommonModule, TableModule, TagModule, ButtonModule, DatePipe],
    templateUrl: './conge-history.component.html',
    styleUrls: ['./conge-history.component.scss']
})
export class CongeHistoryComponent {
    @Input() requests: CongeResponseDto[] = [];

    getSeverity(status: string): 'success' | 'warn' | 'danger' | 'info' | 'secondary' {
        switch (status) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warn';
            case 'Rejected':
                return 'danger';
            case 'Cancelled':
                return 'secondary';
            default:
                return 'info';
        }
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'Approved':
                return 'Acceptée';
            case 'Pending':
                return 'En attente';
            case 'Rejected':
                return 'Refusée';
            case 'Cancelled':
                return 'Annulée';
            default:
                return status;
        }
    }
}
