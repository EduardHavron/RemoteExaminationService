import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from './Authorization/login-form/login-form.component';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RegisterFormComponent} from './Authorization/register-form/register-form.component';
import {AuthGuard} from './Shared/Services/Auth/auth.guard';
import {PageNotFoundComponent} from './PageNotFound/page-not-found/page-not-found.component';
import {DashboardComponent} from './Dashboard/dashboard/dashboard.component';
// canActivate: [AuthGuard]
const routes: Routes = [
  {path: 'login',
    component: LoginFormComponent},
  {path: 'register',
    component: RegisterFormComponent},
  {path: 'dashboard',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    component: DashboardComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [HttpClientModule, FormsModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
