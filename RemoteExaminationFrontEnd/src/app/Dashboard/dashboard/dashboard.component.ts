import { Component, OnInit } from '@angular/core';
import {ExamService} from '../../Shared/Services/Exam/exam.service';
import {AuthorizationService} from '../../Shared/Services/Auth/authorization.service';
import {Auth} from '../../Shared/Models/UserAuth/auth';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IQuestion} from '../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../Shared/Models/ExamView/Interfaces/Exam/IExam';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: Auth;
  ExamList: Array<IExam<IQuestion<IAnswer>>>;
  private destroy$ = new Subject<void>();

  constructor(private examService: ExamService,
              private authenticationService: AuthorizationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
     this.getExams();
  }

  getExams(): void {
    this.examService.getExams()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.ExamList = data;
      });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin;
  }

  isExaminer(): boolean {
    return this.authenticationService.isExaminer;
  }

  isExamined(): boolean {
    return this.authenticationService.isExamined;
  }
}
