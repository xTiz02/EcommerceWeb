import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path: '', redirectTo: 'customer', pathMatch: 'full'},
    {path: 'login', component: LoginComponent },
    {path:'signup',component:SignupComponent},
    {path:'admin', loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)},
    {path:'customer', loadChildren:() => import('./customer/customer.module').then(m => m.CustomerModule)}
];
