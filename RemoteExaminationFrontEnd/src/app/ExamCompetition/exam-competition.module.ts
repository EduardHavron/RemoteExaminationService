import {NgModule} from '@angular/core';
import {ExamCompetitionComponent} from './Pages/exam-competition/exam-competition.component';
import {ExamResultsComponent} from './Pages/exam-results/exam-results.component';
import {ExamResultComponent} from './Pages/exam-result/exam-result.component';
import {ExamCompetitionRoutingModule} from './exam-competition-routing/exam-competition-routing.module';
import {SharedModule} from '../Shared/Modules/shared.module';


@NgModule({
  declarations: [
    ExamCompetitionComponent,
    ExamResultsComponent,
    ExamResultComponent
  ],
  imports: [
    ExamCompetitionRoutingModule,
    SharedModule.forRoot()
  ]
})
export class ExamCompetitionModule {
}