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
            // ================= PROJECTS =================
            { path: 'Parametrages/projects', loadComponent: () => import('./app/pages/Parametrages/projects/project-list/project-list.component').then((m) => m.ProjectListComponent) },
            { path: 'Parametrages/projects/new', loadComponent: () => import('./app/pages/Parametrages/projects/project-form/project-form.component').then((m) => m.ProjectFormComponent) },
            { path: 'Parametrages/projects/:id/edit', loadComponent: () => import('./app/pages/Parametrages/projects/project-edit/project-edit.component').then((m) => m.ProjectEditComponent) },
            { path: 'Parametrages/projects/:id/details', loadComponent: () => import('./app/pages/Parametrages/projects/project-details/project-details.component').then((m) => m.ProjectDetailsComponent) },

            // ================= DEPARTMENTS =================
            { path: 'Parametrages/departments', loadComponent: () => import('./app/pages/Parametrages/departments/list/department-list.component').then((m) => m.DepartmentsListComponent) },
            { path: 'Parametrages/departments/new', loadComponent: () => import('./app/pages/Parametrages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'Parametrages/departments/:id/edit', loadComponent: () => import('./app/pages/Parametrages/departments/form/department-form.component').then((m) => m.DepartmentFormComponent) },
            { path: 'Parametrages/departments/:id/details', loadComponent: () => import('./app/pages/Parametrages/departments/details/department-details.component').then((m) => m.DepartmentDetailsComponent) },

            // ================= USERS =================
            { path: 'administration/users', loadComponent: () => import('./app/pages/administration/users/users-list/users-list.component').then((m) => m.UsersListComponent) },
            { path: 'administration/users/new', loadComponent: () => import('./app/pages/administration/users/user-form/user-form.component').then((m) => m.UserFormComponent) },
            { path: 'administration/users/:id/edit', loadComponent: () => import('./app/pages/administration/users/user-edit/user-edit').then((m) => m.UserEditComponent) },
            { path: 'administration/users/:id/details', loadComponent: () => import('./app/pages/administration/users/user-details/user-details.component').then((m) => m.UserDetailsComponent) },

            // ================= ROLES =================
            { path: 'administration/roles', loadComponent: () => import('./app/pages/administration/roles/roles-list/roles-list').then((m) => m.RolesListComponent) },

            // FIXED: RolesForm → RolesFormComponent
            { path: 'administration/roles/new', loadComponent: () => import('./app/pages/administration/roles/roles-form/roles-form').then((m) => m.RolesFormComponent) },

            { path: 'administration/roles/:name/edit', loadComponent: () => import('./app/pages/administration/roles/roles-edit/roles-edit').then((m) => m.RolesEditComponent) },
            { path: 'administration/roles/:name/details', loadComponent: () => import('./app/pages/administration/roles/role-details/role-details').then((m) => m.RolesDetailsComponent) },

            // FIXED: :name/permissions → :id/permissions (uses roleMetadataId now)
            { path: 'administration/roles/:id/permissions', loadComponent: () => import('./app/pages/administration/roles/roles-permissions-management/roles-permissions-management').then((m) => m.RolesPermissionsManagementComponent) },

            // ================= MODULES =================
            { path: 'Parametrages/modules', loadComponent: () => import('./app/pages/Parametrages/modules/modules-list/modules-list').then((m) => m.ModulesListComponent) },
            { path: 'Parametrages/modules/new', loadComponent: () => import('./app/pages/Parametrages/modules/modules-form/modules-form').then((m) => m.ModulesFormComponent) },
            { path: 'Parametrages/modules/:id/edit', loadComponent: () => import('./app/pages/Parametrages/modules/modules-edit/modules-edit').then((m) => m.ModulesEditComponent) },
            { path: 'Parametrages/modules/:id/details', loadComponent: () => import('./app/pages/Parametrages/modules/modules-details/modules-details').then((m) => m.ModulesDetailsComponent) },

            // ================= TRACABILITY =================
            { path: 'administration/tracability', loadComponent: () => import('./app/pages/administration/tracability/traceability/traceability').then((m) => m.TraceLogListComponent) },

            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'portal', loadComponent: () => import('./app/pages/portal/portal.component').then(m => m.PortalComponent) },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];