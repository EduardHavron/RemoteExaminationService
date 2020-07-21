import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Modules/shared.module';
import {ExamRoutingModule} from './exam-routing/exam-routing.module';
import {ExamCompetitionComponent} from './Pages/exam-competition/exam-competition.component';
import {ExamDetailsComponent} from './Pages/exam-details/exam-details.component';
import {ExamResultViewComponent} from './Pages/exam-result-view/exam-result-view.component';
import {NbAccordionModule, NbListModule, NbTreeGridModule} from '@nebular/theme';
import {ExamCreateEditComponent} from './Pages/exam-create-edit/exam-create-edit.component';



@NgModule({
  declarations: [
    ExamCompetitionComponent,
    ExamDetailsComponent,
    ExamResultViewComponent,
    ExamCreateEditComponent,
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
