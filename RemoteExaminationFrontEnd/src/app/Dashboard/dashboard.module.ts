import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent} from './Pages/dashboard/dashboard.component';
import { DashboardRoutingModule} from './dashboard-routing/dashboard-routing.module';
import { SharedModule} from '../Shared/Services/Shared/Modules/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    SharedModule.forRoot()
  ]
})
export class DashboardModule { }
