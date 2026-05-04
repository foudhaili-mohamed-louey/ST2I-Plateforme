import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-conge-stats',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './conge-stats.component.html',
    styleUrls: ['./conge-stats.component.scss']
})
export class CongeStatsComponent {
    stats = [
        {
            title: 'Solde annuel',
            value: '30 jours',
            subtitle: 'Total autorisé',
            icon: 'pi pi-calendar',
            color: 'blue'
        },
        {
            title: 'Jours utilisés',
            value: '12 jours',
            subtitle: 'Congés consommés',
            icon: 'pi pi-calendar-minus',
            color: 'orange'
        },
        {
            title: 'Jours restants',
            value: '18 jours',
            subtitle: 'Encore disponibles',
            icon: 'pi pi-check-circle',
            color: 'green'
        },
        {
            title: 'En attente',
            value: '2',
            subtitle: 'Demandes non traitées',
            icon: 'pi pi-clock',
            color: 'purple'
        }
    ];
}
