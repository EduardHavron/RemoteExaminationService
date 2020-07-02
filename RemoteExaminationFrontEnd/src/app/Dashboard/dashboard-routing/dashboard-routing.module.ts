import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '../Pages/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../PageNotFound/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
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
export class DashboardRoutingModule {
}
