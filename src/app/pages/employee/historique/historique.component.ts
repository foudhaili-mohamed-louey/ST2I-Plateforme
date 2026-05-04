import { Component } from '@angular/core';
import { EmployeeStatsWidget } from './employee-stats-widget';
import { EmployeeRequestsWidget } from './employee-requests-widget';

@Component({
    selector: 'app-historique',
    standalone: true,
    imports: [EmployeeStatsWidget, EmployeeRequestsWidget],
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent {}
