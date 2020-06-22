import { NgModule } from '@angular/core';
import {ExamService} from '../Shared/Services/Exam/exam.service';
import {ExamCompetitionService} from '../Shared/Services/ExamCompetition/exam-competition.service';
import {SharedModule} from '../Shared/Services/Shared/Modules/shared.module';
import {ExamRoutingModule} from './exam-routing/exam-routing.module';
import {ExamCompetitionComponent} from './Pages/exam-competition/exam-competition.component';
import {ExamDetailsComponent} from './Pages/exam-details/exam-details.component';
import {ExamResultViewComponent} from './Pages/exam-result-view/exam-result-view.component';
import {NbAccordionModule} from '@nebular/theme';
import {NbListModule} from '@nebular/theme';
import { ExamEditComponent } from './Pages/exam-edit/exam-edit.component';
import { ExamCreateComponent } from './Pages/exam-create/exam-create.component';


@NgModule({
  declarations: [
    ExamCompetitionComponent,
    ExamDetailsComponent,
    ExamResultViewComponent,
    ExamEditComponent,
    ExamCreateComponent
  ],
  imports: [
    ExamRoutingModule,
    SharedModule.forRoot(),
    NbAccordionModule,
    NbListModule
  ],
  providers: [
    ExamService,
    ExamCompetitionService
  ]
})
export class ExamModule { }
