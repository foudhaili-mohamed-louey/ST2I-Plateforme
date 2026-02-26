import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { RolesComponent } from './administration/roles/roles.component';
import { UsersListComponent } from './administration/users/users-list/users-list.component';
//import { TracabiliteComponent } from './administration/tracabilite/tracabilite.component';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    {
        path: 'administration',
        children: [
            { path: 'roles', component: RolesComponent },
            { path: 'users', component: UsersListComponent },
            //{ path: 'tracabilite', component: TracabiliteComponent },
        ]
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
