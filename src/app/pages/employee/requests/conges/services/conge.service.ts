import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CongeRequestDto } from '../dto/conge-request.dto';
import { CongeResponseDto } from '../dto/conge-response.dto';

@Injectable({
    providedIn: 'root'
})
export class CongeService {
    private requests: CongeResponseDto[] = [
        {
            id: 1,
            leaveTypeName: 'Congé annuel',
            startDate: '2026-05-20',
            endDate: '2026-05-22',
            reason: 'Repos',
            description: 'Besoin de repos',
            status: 'Approved',
            createdAt: '2026-05-01'
        },
        {
            id: 2,
            leaveTypeName: 'Congé maladie',
            startDate: '2026-04-10',
            endDate: '2026-04-12',
            reason: 'Maladie',
            status: 'Pending',
            createdAt: '2026-04-09'
        },
        {
            id: 3,
            leaveTypeName: 'Congé exceptionnel',
            startDate: '2026-03-15',
            endDate: '2026-03-16',
            reason: 'Situation familiale',
            description: 'Demande exceptionnelle',
            status: 'Rejected',
            createdAt: '2026-03-10'
        },
        {
            id: 4,
            leaveTypeName: 'Congé annuel',
            startDate: '2026-06-01',
            endDate: '2026-06-05',
            reason: 'Vacances',
            description: 'Repos annuel',
            status: 'Cancelled',
            createdAt: '2026-05-20'
        }
    ];

    getMyRequests(): Observable<CongeResponseDto[]> {
        return of(this.requests);
    }

    createRequest(data: CongeRequestDto): Observable<any> {
        this.requests.push({
            id: this.requests.length + 1,
            leaveTypeName: 'Congé annuel',
            startDate: data.startDate,
            endDate: data.endDate,
            reason: data.reason,
            description: data.description,
            status: 'Pending',
            createdAt: new Date().toISOString()
        });

        return of(true);
    }
}
