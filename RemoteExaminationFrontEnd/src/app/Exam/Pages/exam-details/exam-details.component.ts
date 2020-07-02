import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
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
  examId: number;
  exam: IExam<IQuestion<IAnswer>>;
  faCheck = faCheck;
  faEdit = faEdit;
  private destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute,
              private examService: ExamService) {
    this.examId = this.activatedRoute.snapshot.params.examId;
  }

  ngOnInit() {
    this.getExam(this.examId);
  }

  getExam(examId: number) {
    this.examService.getExamById(examId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.exam = data;
      });
  }
}
