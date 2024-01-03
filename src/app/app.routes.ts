import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {authGuard} from "./guards/auth.guard";
import {loginGuard} from "./guards/login.guard";

export const routes: Routes = [
  { path: 'home', component: HomePageComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterPageComponent },
];
