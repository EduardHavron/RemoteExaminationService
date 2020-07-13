import {NgModule} from '@angular/core';
import {LoginFormComponent} from './Pages/login-form/login-form.component';
import {RegisterFormComponent} from './Pages/register-form/register-form.component';
import {AuthorizationRouterModule} from './authorization-router/authorization-router.module';
import {SharedModule} from '../Shared/Modules/shared.module';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    AuthorizationRouterModule,
    SharedModule,
  ]
})
export class AuthorizationModule {
}
