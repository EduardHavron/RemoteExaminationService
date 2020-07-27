import {Component, OnInit} from '@angular/core';
import {IExamResult} from '../../../Shared/Models/ExamResults/exam-result';
import {ActivatedRoute, Router} from '@angular/router';
import {ExamCompetitionService} from '../../../Shared/Services/ExamCompetition/exam-competition.service';

@Component({
  selector: 'app-exam-result-view',
  templateUrl: './exam-results.component.html',
  styleUrls: ['./exam-results.component.scss']
})
export class ExamResultsComponent implements OnInit {
  examResults: Array<IExamResult>;
  examId: number;

  constructor(router: Router,
              examCompetitionService: ExamCompetitionService,
              activatedRoute: ActivatedRoute) {
    this.examId = parseInt(activatedRoute.snapshot.params.examId, 10);
    examCompetitionService
      .getExamResults(this.examId)
      .subscribe((examResults) => {
        this.examResults = examResults;
      });
  }

  ngOnInit() {
  }

}
