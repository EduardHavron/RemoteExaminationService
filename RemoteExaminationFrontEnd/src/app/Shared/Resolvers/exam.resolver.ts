import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ExamService} from '../Services/Exam/exam.service';
import {IExam} from '../Models/ExamView/Exam/IExam';
import {IQuestion} from '../Models/ExamView/Question/IQuestion';
import {IAnswer} from '../Models/ExamView/Answer/IAnswer';

@Injectable({providedIn: 'root'})
export class ExamResolver implements Resolve<IExam<IQuestion<IAnswer>>> {
  constructor(private service: ExamService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getExamById(route.params.examId);
  }
}
