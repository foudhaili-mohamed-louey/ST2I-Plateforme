import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-employee-stats-widget',
    imports: [CommonModule],
    template: `
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Solde des congés</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">18 jours</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-calendar text-blue-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">22 jours </span>
                <span class="text-muted-color">au total</span>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Absences</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">4</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-calendar-times text-orange-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">2 </span>
                <span class="text-muted-color">ce mois</span>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Demandes congés</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">7</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-send text-cyan-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">5 </span>
                <span class="text-muted-color">acceptées</span>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Demandes administratives</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">3</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-file text-purple-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">1 </span>
                <span class="text-muted-color">en attente</span>
            </div>
        </div>

        <div *ngIf="isItDepartment" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Projets</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">2</div>
                    </div>
                    <div class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-briefcase text-green-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Département IT </span>
                <span class="text-muted-color">uniquement</span>
            </div>
        </div>

        <div *ngIf="isItDepartment" class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Équipes</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">1</div>
                    </div>
                    <div class="flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-pink-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Équipe active </span>
                <span class="text-muted-color">actuellement</span>
            </div>
        </div>
    `
})
export class EmployeeStatsWidget {
    isItDepartment = true;
}
