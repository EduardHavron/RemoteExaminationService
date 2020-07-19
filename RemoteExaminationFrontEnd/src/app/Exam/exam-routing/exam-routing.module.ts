import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../PageNotFound/page-not-found/page-not-found.component';
import {ExamDetailsComponent} from '../Pages/exam-details/exam-details.component';
import {ExamCreateEditComponent} from '../Pages/exam-create/exam-create-edit.component';
import {ExaminerGuard} from '../../Shared/Guard/examiner.guard';
import {ExamResolver} from '../../Shared/Resolvers/exam.resolver';

const routes: Routes = [
  {
    path: 'exam/create',
    component: ExamCreateEditComponent,
    canActivate: [ExaminerGuard]
  },
  {
    path: 'exam/:examId',
    component: ExamDetailsComponent,
    canActivate: [ExaminerGuard],
    canLoad: [ExaminerGuard],
    resolve: {
      exam: ExamResolver
    }
  },
  {
    path: 'exam/:examId/edit',
    component: ExamCreateEditComponent,
    canActivate: [ExaminerGuard],
    canLoad: [ExaminerGuard],
    resolve: {
      exam: ExamResolver
    }
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
export class ExamRoutingModule {
}
