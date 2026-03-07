import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { DepartmentsListComponent } from './departments/list/department-list.component';
import { UsersListComponent } from './administration/users/users-list/users-list.component';
export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'departments', component: DepartmentsListComponent },
    {
        path: 'administration',
        children: [
            { path: 'users', component: UsersListComponent },
            { path: 'tracability', loadComponent: () => import('./administration/tracability/tracability.component').then(m => m.TracabilityComponent) },
        ]
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
