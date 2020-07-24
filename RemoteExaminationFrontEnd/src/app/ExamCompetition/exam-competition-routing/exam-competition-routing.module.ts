import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ExamResolver} from '../../Shared/Resolvers/exam.resolver';
import {ExamResultsComponent} from '../Pages/exam-results/exam-results.component';
import {ExaminerGuard} from '../../Shared/Guard/examiner.guard';
import {ExamResultComponent} from '../Pages/exam-result/exam-result.component';
import {ExamCompetitionComponent} from '../Pages/exam-competition/exam-competition.component';
import {ExaminedGuard} from '../../Shared/Guard/examined.guard';

const routes: Routes = [
  {
    path: ':examId/results',
    component: ExamResultsComponent,
    canLoad: [ExaminerGuard],
    canActivate: [ExaminerGuard]
  },
  {
    path: ':examId/results/:resultId',
    component: ExamResultComponent,
    canLoad: [ExaminerGuard],
    canActivate: [ExaminerGuard]
  },
  {
    path: ':examId/competition',
    component: ExamCompetitionComponent,
    canLoad: [ExaminedGuard],
    canActivate: [ExaminedGuard],
    resolve: {
      exam: ExamResolver
    }
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
export class ExamCompetitionRoutingModule {
}
