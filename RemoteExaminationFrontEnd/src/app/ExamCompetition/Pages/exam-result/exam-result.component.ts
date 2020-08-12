import {Component, OnInit} from '@angular/core';
import {IExamResult} from '../../../Shared/Models/ExamResults/exam-result';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss']
})
export class ExamResultComponent implements OnInit {
  examResult: IExamResult;
  faCheck = faCheck;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe((data: { examResult: any }) => {
      this.examResult = data.examResult;
    });
  }

  ngOnInit() {
  }

}
