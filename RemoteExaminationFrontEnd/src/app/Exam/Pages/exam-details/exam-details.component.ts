import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';

import {faCheck, faEdit} from '@fortawesome/free-solid-svg-icons';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';


@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  exam: IExam<IQuestion<IAnswer>>;
  faCheck = faCheck;
  faEdit = faEdit;

  constructor(private activatedRoute: ActivatedRoute,
              private examService: ExamService,
              private route: ActivatedRoute) {
    route.data.subscribe((data: {exam: any}) => {
      this.exam = data.exam;
    });
  }

  ngOnInit() {
  }
}
