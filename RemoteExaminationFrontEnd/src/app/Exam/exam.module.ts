import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Modules/shared.module';
import {ExamRoutingModule} from './exam-routing/exam-routing.module';
import {ExamCompetitionComponent} from './Pages/exam-competition/exam-competition.component';
import {ExamDetailsComponent} from './Pages/exam-details/exam-details.component';
import {ExamResultViewComponent} from './Pages/exam-result-view/exam-result-view.component';
import {NbAccordionModule, NbListModule, NbTreeGridModule} from '@nebular/theme';
import {ExamEditComponent} from './Pages/exam-edit/exam-edit.component';
import {ExamCreateComponent} from './Pages/exam-create/exam-create.component';



@NgModule({
  declarations: [
    ExamCompetitionComponent,
    ExamDetailsComponent,
    ExamResultViewComponent,
    ExamEditComponent,
    ExamCreateComponent,
  ],
  imports: [
    ExamRoutingModule,
    SharedModule.forRoot(),
    NbAccordionModule,
    NbListModule,
    NbTreeGridModule,
  ],

})
export class ExamModule {
}
