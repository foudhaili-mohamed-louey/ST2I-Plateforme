import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },

            { path: 'Parametrages/departments', loadComponent: () => import('./app/pages/Parametrages/departments/list/department-list.component').then((m) => m.DepartmentsListComponent) },
            { path: 'Parametrages/departments/new', loadComponent: () => import('./app/pages/Parametrages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'Parametrages/departments/:id/edit', loadComponent: () => import('./app/pages/Parametrages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'Parametrages/departments/:id/details', loadComponent: () => import('./app/pages/Parametrages/departments/details/department-details.component').then((m) => m.DepartmentDetailsComponent) },

            { path: 'Parametrages/projects', loadComponent: () => import('./app/pages/Parametrages/projects/project-list/project-list.component').then((m) => m.ProjectListComponent) },
            { path: 'Parametrages/projects/new', loadComponent: () => import('./app/pages/Parametrages/projects/project-form/project-form.component').then((m) => m.ProjectFormComponent) },
            { path: 'Parametrages/projects/:id/edit', loadComponent: () => import('./app/pages/Parametrages/projects/project-edit/project-edit.component').then((m) => m.ProjectEditComponent) },
            { path: 'Parametrages/projects/:id/details', loadComponent: () => import('./app/pages/Parametrages/projects/project-details/project-details.component').then((m) => m.ProjectDetailsComponent) },

            { path: 'administration/users', loadComponent: () => import('./app/pages/administration/users/users-list/users-list.component').then((m) => m.UsersListComponent) },
            { path: 'administration/users/new', loadComponent: () => import('./app/pages/administration/users/user-form/user-form.component').then((m) => m.UserFormComponent) },
            { path: 'administration/users/:id/edit', loadComponent: () => import('./app/pages/administration/users/user-form/user-form.component').then((m) => m.UserFormComponent) },
            { path: 'administration/users/:id/details', loadComponent: () => import('./app/pages/administration/users/user-details/user-details.component').then((m) => m.UserDetailsComponent) },
            { path: 'administration/tracability', loadComponent: () => import('./app/pages/administration/tracability/tracability.component').then((m) => m.TracabilityComponent) },

            { path: 'employee/historique', loadComponent: () => import('./app/pages/employee/historique/historique.component').then((m) => m.HistoriqueComponent) },
            { path: 'employee/profil', loadComponent: () => import('./app/pages/employee/profil/profil.component').then((m) => m.ProfilComponent) },
            { path: 'employee/requests/absences', loadComponent: () => import('./app/pages/employee/requests/absences/absences.component').then((m) => m.AbsencesComponent) },
            { path: 'employee/requests/conges', loadComponent: () => import('./app/pages/employee/requests/conges/conges.component').then((m) => m.CongesComponent) },

            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'portal', loadComponent: () => import('./app/pages/portal/portal.component').then((m) => m.PortalComponent) },
    { path: '**', redirectTo: '/notfound' }
];
