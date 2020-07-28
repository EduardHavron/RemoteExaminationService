import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {IExamResult} from '../Models/ExamResults/exam-result';
import {ExamCompetitionService} from '../Services/ExamCompetition/exam-competition.service';

@Injectable({providedIn: 'root'})
export class ExamResultResolver implements Resolve<IExamResult> {
  constructor(private service: ExamCompetitionService) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getExamResult(parseInt(route.params.resultId, 10));
  }
}
