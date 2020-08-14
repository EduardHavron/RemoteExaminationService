import {NgModule} from '@angular/core';
import {DashboardComponent} from './Pages/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing/dashboard-routing.module';
import {SharedModule} from '../Shared/Modules/shared.module';
import {NbSpinnerModule} from '@nebular/theme';
import {WebcamModule} from 'ngx-webcam';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule.forRoot(),
    NbSpinnerModule,
    WebcamModule
  ]
})
export class DashboardModule {
}
