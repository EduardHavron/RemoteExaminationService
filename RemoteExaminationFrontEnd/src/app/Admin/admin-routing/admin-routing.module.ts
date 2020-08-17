import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../PageNotFound/page-not-found/page-not-found.component';
import {AdminDashboardComponent} from '../Pages/admin-dashboard/admin-dashboard.component';
import {ManageUsersComponent} from '../Pages/manage-users/manage-users.component';
import {ManageUserComponent} from '../Pages/manage-user/manage-user.component';
import {ManageDatabaseComponent} from '../Pages/manage-database/manage-database.component';
import {UsersResolver} from '../../Shared/Resolvers/users-resolver';
import {UserResolver} from '../../Shared/Resolvers/user-resolver';
import {GetBackupComponent} from '../Pages/get-backup/get-backup.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  },
  {
    path: 'users',
    component: ManageUsersComponent,
    resolve: {
      users: UsersResolver
    }
  },
  {
    path: 'user/:userId',
    component: ManageUserComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'database',
    component: ManageDatabaseComponent
  },
  {
    path: 'backup',
    component: GetBackupComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
