import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Employees } from './employees/employees';
import { Projects } from './projects/projects';
import { Teams } from './teams/teams';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path : 'employees' , component : Employees},
    {path : 'projects' , component : Projects},
    {path: 'teams', component :Teams}
];
