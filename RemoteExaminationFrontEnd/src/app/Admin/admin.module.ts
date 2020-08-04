import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Modules/shared.module';
import {AdminRoutingModule} from './admin-routing/admin-routing.module';
import {AdminDashboardComponent} from './Pages/admin-dashboard/admin-dashboard.component';
import {ManageUsersComponent} from './Pages/manage-users/manage-users.component';
import {ManageUserComponent} from './Pages/manage-user/manage-user.component';
import {ManageDatabaseComponent} from './Pages/manage-database/manage-database.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageUsersComponent,
    ManageUserComponent,
    ManageDatabaseComponent,
  ],
  imports: [
    AdminRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class AdminModule {
}
