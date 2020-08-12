import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';

import {faCheck, faEdit} from '@fortawesome/free-solid-svg-icons';
import {IQuestion} from '../../../Shared/Models/ExamView/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Exam/IExam';
import {SpinnerService} from '../../../Shared/Services/Spinner/spinner.service';


@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  exam: IExam<IQuestion<IAnswer>>;
  faCheck = faCheck;
  faEdit = faEdit;
  isLoading: boolean;

  constructor(private examService: ExamService,
              private route: ActivatedRoute,
              private spinnerService: SpinnerService) {
    route.data.subscribe((data: { exam: any }) => {
      this.exam = data.exam;
    });
    this.spinnerService.isLoading.subscribe(value => this.isLoading = value);
  }

  ngOnInit() {
  }
}
