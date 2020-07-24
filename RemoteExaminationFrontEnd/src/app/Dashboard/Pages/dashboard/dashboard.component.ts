import {Component, OnInit} from '@angular/core';
import {ExamService} from '../../../Shared/Services/Exam/exam.service';
import {AuthorizationService} from '../../../Shared/Services/Auth/authorization.service';
import {IUser} from '../../../Shared/Models/UserAuth/IUser';
import {faEdit, faTrash, faVoteYea} from '@fortawesome/free-solid-svg-icons';
import {IQuestion} from '../../../Shared/Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../../Shared/Models/ExamView/Interfaces/Answer/IAnswer';
import {IExam} from '../../../Shared/Models/ExamView/Interfaces/Exam/IExam';
import {CustomToastrService} from '../../../Shared/Services/NbToastr/custom-toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: IUser;
  ExamList: Array<IExam<IQuestion<IAnswer>>>;
  faTrash = faTrash;
  faEdit = faEdit;
  faVoteYea = faVoteYea;

  constructor(private examService: ExamService,
              private authenticationService: AuthorizationService,
              private customToastrService: CustomToastrService) {
    this.authenticationService.currentUserSubject.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getExams();
  }

  getExams(): void {
    this.examService.getExams()
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

  deleteExam(examId: number, examPos: number) {
    this.examService.deleteExam(examId).subscribe(() => {
      this.customToastrService.showToast('top-right',
        'success',
        1600,
        'Экзамен удален',
        'Успех');
      this.removeExamFromPage(examPos);
    });
  }

  removeExamFromPage(examPos: number) {
    this.ExamList.splice(examPos, 1);
  }
}
