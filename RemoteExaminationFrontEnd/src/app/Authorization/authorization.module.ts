import {NgModule} from '@angular/core';
import {LoginFormComponent} from './Pages/login-form/login-form.component';
import {RegisterFormComponent} from './Pages/register-form/register-form.component';
import {AuthorizationRouterModule} from './authorization-router/authorization-router.module';
import {SharedModule} from '../Shared/Modules/shared.module';
import {NbSpinnerModule, NbStepperModule, NbWindowModule} from '@nebular/theme';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    AuthorizationRouterModule,
    SharedModule,
    NbSpinnerModule,
    NbStepperModule,
    WebcamModule,
    NbWindowModule
  ]
})
export class AuthorizationModule {
}
