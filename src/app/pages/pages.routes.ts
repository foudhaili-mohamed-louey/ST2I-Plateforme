import { Routes } from '@angular/router';
import { Empty } from './empty/empty';
import { DepartmentsListComponent } from './Parametrages/departments/list/department-list.component';
import { UsersListComponent } from './administration/users/users-list/users-list.component';
import { ProjectListComponent } from './Parametrages/projects/project-list/project-list.component';
export default [
    { path: 'empty', component: Empty },
    {
        path: 'administration',
        children: [
            { path: 'users', component: UsersListComponent },
            { path: 'tracability', loadComponent: () => import('./administration/tracability/tracability.component').then((m) => m.TracabilityComponent) }
        ]
    },
    {
        path: 'Parametrages',
        children: [
            { path: 'departments', component: DepartmentsListComponent },
            { path: 'projects', component: ProjectListComponent }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
