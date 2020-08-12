import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IExamResult} from '../../Models/ExamResults/exam-result';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {IExam} from '../../Models/ExamView/Exam/IExam';
import {IQuestion} from '../../Models/ExamView/Question/IQuestion';
import {IAnswer} from '../../Models/ExamView/Answer/IAnswer';

@Injectable({
  providedIn: 'root'
})
export class ExamCompetitionService {
  private url = environment.apiPath + 'ExamCompetition/';

  constructor(private http: HttpClient) {
  }

  sendResult(examResult: IExam<IQuestion<IAnswer>>) {
    return this.http.post(this.url + 'SendResult', examResult, {reportProgress: true});
  }

  getExamResults(examId: number): Observable<Array<IExamResult>> {
    return this.http.get<Array<IExamResult>>(this.url + 'GetAllResults/' + examId, {reportProgress: true});
  }

  getExamResult(examResultId: number): Observable<IExamResult> {
    return this.http.get<IExamResult>(this.url + 'GetExamResult/' + examResultId, {reportProgress: true});
  }
}
