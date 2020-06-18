import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamResult} from '../../Models/ExamResults/exam-result';
import {Observable} from 'rxjs';
import {ApiConfig} from '../Shared/api-config';

@Injectable({
  providedIn: 'root'
})
export class ExamCompetitionService {
  private url = ApiConfig.apiPath + 'ExamCompetition/';
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
