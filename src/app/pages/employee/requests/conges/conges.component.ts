import { Component, OnInit } from '@angular/core';
import { CongeService } from './services/conge.service';
import { CongeResponseDto } from './dto/conge-response.dto';
import { CongeRequestDto } from './dto/conge-request.dto';

import { CongeFormComponent } from './conge-form/conge-form.component';
import { CongeHistoryComponent } from './conge-history/conge-history.component';
import { CongeStatsComponent } from './conge-stats/conge-stats.component';

@Component({
    selector: 'app-conges',
    standalone: true,
    imports: [CongeFormComponent, CongeHistoryComponent, CongeStatsComponent],
    templateUrl: './conges.component.html'
})
export class CongesComponent implements OnInit {
    requests: CongeResponseDto[] = [];

    constructor(private congeService: CongeService) {}

    ngOnInit(): void {
        this.loadRequests();
    }

    loadRequests(): void {
        this.congeService.getMyRequests().subscribe({
            next: (data) => {
                this.requests = data;
            }
        });
    }

    onSubmit(data: CongeRequestDto): void {
        this.congeService.createRequest(data).subscribe({
            next: () => {
                this.loadRequests();
            }
        });
    }
}
