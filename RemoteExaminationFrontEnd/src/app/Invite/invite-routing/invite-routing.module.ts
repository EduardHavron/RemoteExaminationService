import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from '../../PageNotFound/page-not-found/page-not-found.component';
import {AppendInviteComponent} from '../Pages/append-invite/append-invite.component';
import {ExaminerGuard} from '../../Shared/Guard/examiner.guard';
import {ExaminedGuard} from '../../Shared/Guard/examined.guard';
import {GenerateInviteComponent} from '../Pages/generate-invite/generate-invite.component';

const routes: Routes = [
  {
    path: 'create/:examId',
    component: GenerateInviteComponent,
    canActivate: [ExaminerGuard],
    canLoad: [ExaminerGuard]
  },
  {
    path: 'append',
    component: AppendInviteComponent,
    canActivate: [ExaminedGuard],
    canLoad: [ExaminedGuard]
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
    CommonModule
  ]
})
export class InviteRoutingModule {
}
