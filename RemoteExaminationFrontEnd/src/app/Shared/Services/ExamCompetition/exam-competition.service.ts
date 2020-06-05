import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamResult} from '../../Models/ExamResults/exam-result';

@Injectable({
  providedIn: 'root'
})
export class ExamCompetitionService {
  private url = 'https://localhost:5001/api/ExamCompetition/';
  constructor(private http: HttpClient) { }

  examCompetition(examResult: ExamResult) {
    return this.http.post(this.url + 'ExamCompetition', examResult);
  }
}
