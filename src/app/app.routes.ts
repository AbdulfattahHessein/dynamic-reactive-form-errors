import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard, notAuthGuard } from './guards/auth.guard';
import { TestFormComponent } from './test-form/test-form.component';

export const routes: Routes = [
  {
    path: '',
    component: TestFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [notAuthGuard],
  },
];
