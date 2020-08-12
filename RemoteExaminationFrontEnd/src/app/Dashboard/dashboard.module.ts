import {NgModule} from '@angular/core';
import {DashboardComponent} from './Pages/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing/dashboard-routing.module';
import {SharedModule} from '../Shared/Modules/shared.module';
import {NbSpinnerModule} from '@nebular/theme';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule.forRoot(),
    NbSpinnerModule
  ]
})
export class DashboardModule {
}
