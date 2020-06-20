import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExamService} from '../Shared/Services/Exam/exam.service';
import {ExamCompetitionService} from '../Shared/Services/ExamCompetition/exam-competition.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ExamService,
    ExamCompetitionService
  ]
})
export class ExamModule { }
