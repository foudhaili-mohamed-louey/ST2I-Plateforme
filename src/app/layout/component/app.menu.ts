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
    </ul> `,
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                path: '/pages',
                items: [
                    {
                        label: 'Department Management',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['/departments']
                    },
                    {
                        label: 'Administration',
                        icon: 'pi pi-fw pi-cog',
                        path: '/administration',
                        items: [
                            { label: 'role Management', icon: 'pi pi-shield', routerLink: ['/administration/roles'] },
                            { label: 'User Management', icon: 'pi pi-users', routerLink: ['/administration/users'] },
                            { label: 'Tracability', icon: 'pi pi-list', routerLink: ['/administration/tracability'] }
                        ]
                    },
                ]
            },
        ];
    }
}
