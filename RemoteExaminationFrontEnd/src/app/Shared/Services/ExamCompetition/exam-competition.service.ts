import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamResult} from '../../Models/ExamResults/exam-result';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamCompetitionService {
  private url = 'https://localhost:5001/api/ExamCompetition/';
  constructor(private http: HttpClient) { }

  examCompetition(examResult: ExamResult) {
    return this.http.post(this.url + 'ExamCompetition', examResult);
  }

  getExamResults(examId: number): Observable<Array<ExamResult>> {
    return this.http.get<Array<ExamResult>>(this.url + 'GetAllResults/' + examId);
  }

  getExamResult(examResultId: number): Observable<ExamResult> {
    return this.http.get<ExamResult>(this.url + 'GetExamResult/' + examResultId);
  }
}
