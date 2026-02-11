import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Employees } from './employees/employees';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path : 'employees' , component : Employees}
];
