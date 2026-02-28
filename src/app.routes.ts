import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },

            { path: 'departments', loadComponent: () => import('./app/pages/departments/list/department-list.component').then((m) => m.DepartmentsListComponent) },
            { path: 'departments/new', loadComponent: () => import('./app/pages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'departments/:id/edit', loadComponent: () => import('./app/pages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'departments/:id/details', loadComponent: () => import('./app/pages/departments/details/department-details.component').then((m) => m.DepartmentDetailsComponent) },

            { path: 'administration/users', loadComponent: () => import('./app/pages/administration/users/users-list/users-list.component').then((m) => m.UsersListComponent) },
            { path: 'administration/users/new', loadComponent: () => import('./app/pages/administration/users/user-form/user-form.component').then((m) => m.UserFormComponent) },
            { path: 'administration/users/:id/edit', loadComponent: () => import('./app/pages/administration/users/user-form/user-form.component').then((m) => m.UserFormComponent) },
            { path: 'administration/users/:id/details', loadComponent: () => import('./app/pages/administration/users/user-details/user-details.component').then((m) => m.UserDetailsComponent) },
            { path: 'administration/tracability', loadComponent: () => import('./app/pages/administration/tracability/tracability.component').then((m) => m.TracabilityComponent) },
            
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
