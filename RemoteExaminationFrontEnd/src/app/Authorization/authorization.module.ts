import { NgModule } from '@angular/core';
import { LoginFormComponent} from './Pages/login-form/login-form.component';
import { RegisterFormComponent} from './Pages/register-form/register-form.component';
import {AuthorizationRouterModule} from './authorization-router/authorization-router.module';
import {SharedModule} from '../Shared/Services/Shared/Modules/shared/shared.module';
import {AuthorizationService} from '../Shared/Services/Auth/authorization.service';
@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    AuthorizationRouterModule,
    SharedModule,
  ],
  providers: [
    AuthorizationService,
  ]
})
export class AuthorizationModule { }
