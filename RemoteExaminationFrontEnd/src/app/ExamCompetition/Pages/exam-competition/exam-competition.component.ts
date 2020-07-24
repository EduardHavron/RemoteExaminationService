import {Component, OnInit} from '@angular/core';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exam-competition',
  templateUrl: './exam-competition.component.html',
  styleUrls: ['./exam-competition.component.scss']
})
export class ExamCompetitionComponent implements OnInit {
exam: IExam<IQuestion<IAnswer>>;
  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data: {exam: any}) => {
      this.exam = data.exam;
    });
  }

  ngOnInit() {
  }

}
