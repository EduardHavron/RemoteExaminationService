import {NgModule} from '@angular/core';
import {AdminRoutingModule} from './admin-routing/admin-routing.module';
import {AdminDashboardComponent} from './Pages/admin-dashboard/admin-dashboard.component';
import {ManageUsersComponent} from './Pages/manage-users/manage-users.component';
import {ManageUserComponent} from './Pages/manage-user/manage-user.component';
import {ManageDatabaseComponent} from './Pages/manage-database/manage-database.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSelectModule, NbSpinnerModule} from '@nebular/theme';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {TranslateModule} from '@ngx-translate/core';
import { GetBackupComponent } from './Pages/get-backup/get-backup.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    ManageUsersComponent,
    ManageUserComponent,
    ManageDatabaseComponent,
    GetBackupComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    NbSelectModule,
    FormsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule,
    NbSpinnerModule
  ]
})
export class AdminModule {
}
