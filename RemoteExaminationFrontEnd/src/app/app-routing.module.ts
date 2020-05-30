import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginFormComponent} from './login-form/login-form.component';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RegisterFormComponent} from './register-form/register-form.component';
// canActivate: [AuthGuard]
const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterFormComponent}
];

@NgModule({
  imports: [HttpClientModule, FormsModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppRoutingModule { }
