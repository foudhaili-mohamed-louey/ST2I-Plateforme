import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        const currentUrl = window.location.pathname;

        if (currentUrl.startsWith('/employee')) {
            this.model = [
                {
                    label: 'Espace Employé',
                    items: [
                        { label: 'Tableau de bord', icon: 'pi pi-home', routerLink: ['/employee/historique'] },
                        { label: 'Gestion de profil', icon: 'pi pi-id-card', routerLink: ['/employee/profil'] },
                        { 
                            label: 'Gestion des demandes', 
                            icon: 'pi pi-calendar-plus', 
                            path: '/employee/requests',
                            items: [
                                { label: 'Demandes de congés', icon: 'pi pi-calendar-plus', routerLink: ['/employee/requests/conges'] },
                                { label: "Gestion d'absence", icon: 'pi pi-calendar-minus', routerLink: ['/employee/absences'] }
                            ]
                        },
                    ]
                }
            ];
        } else {
            this.model = [
                {
                    label: 'Statistiques',
                    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
                },
                {
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    path: '/pages',
                    items: [
                        {
                            label: 'Administration',
                            icon: 'pi pi-fw pi-cog',
                            path: '/administration',
                            items: [
                                { label: 'Gestions des rôles', icon: 'pi pi-shield', routerLink: ['/administration/roles'] },
                                { label: 'Gestion des utilisateurs', icon: 'pi pi-users', routerLink: ['/administration/users'] },
                                { label: 'Tracabilité', icon: 'pi pi-list', routerLink: ['/administration/tracability'] }
                            ]
                        },
                        {
                            label: 'Parametrages',
                            icon: 'pi pi-fw pi-cog',
                            path: '/Parametrages',
                            items: [
                                { label: 'Gestion des départements', icon: 'pi pi-fw pi-building', routerLink: ['/Parametrages/departments'] },
                                { label: 'Gestion des projets', icon: 'pi pi-briefcase', routerLink: ['/Parametrages/projects'] }
                            ]
                        }
                    ]
                }
            ];
        }
    }
}
