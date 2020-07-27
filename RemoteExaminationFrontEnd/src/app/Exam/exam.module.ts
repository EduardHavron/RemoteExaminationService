import {NgModule} from '@angular/core';
import {SharedModule} from '../Shared/Modules/shared.module';
import {ExamRoutingModule} from './exam-routing/exam-routing.module';
import {ExamDetailsComponent} from './Pages/exam-details/exam-details.component';
import {NbAccordionModule, NbListModule, NbTreeGridModule} from '@nebular/theme';
import {ExamCreateEditComponent} from './Pages/exam-create-edit/exam-create-edit.component';


@NgModule({
  declarations: [
    ExamDetailsComponent,
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
