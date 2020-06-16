import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {Observable} from 'rxjs';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.scss']
})
export class ExamDetailsComponent implements OnInit {
  examId: number;
  exam: Observable<IExam<IQuestion<IAnswer>>>;
  constructor(private activatedRoute: ActivatedRoute,
              private examService: ExamService) {
    this.examId = this.activatedRoute.snapshot.params.examId;
  }

  ngOnInit() {
    this.exam = this.getExam(this.examId);
    console.log(this.exam);
  }

  getExam(examId: number) {
      return this.examService.getExamById(examId);
  }
}
