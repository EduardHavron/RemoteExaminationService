import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../PageNotFound/page-not-found/page-not-found.component';
import {ExamDetailsComponent} from '../Pages/exam-details/exam-details.component';
import {ExamEditComponent} from '../Pages/exam-edit/exam-edit.component';
import {ExamCreateComponent} from '../Pages/exam-create/exam-create.component';

const routes: Routes = [
  {
    path: 'exam/:examId',
    component: ExamDetailsComponent
  },
  {
    path: 'exam/:examId/edit',
    component: ExamEditComponent
  },
  {
    path: 'exam/create',
    component: ExamCreateComponent
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
export class ExamRoutingModule { }
