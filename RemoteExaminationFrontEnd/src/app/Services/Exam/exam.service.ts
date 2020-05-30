import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Auth} from '../../Models/UserAuth/auth';
import {ExaminedExam} from '../../Models/ExamView/Exam/examined-exam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private url = 'https://localhost:5001/api/Exam';
  constructor(private http: HttpClient) { }

  getExams() {
    return this.http.get(this.url + 'GetExams');
  }

  getExamById(id: number) {
    return this.http.get(this.url + 'SignIn/' + id);
  }

  createExam(Exam: ExaminedExam) {
    return this.http.post(this.url + 'CreateExam', Exam);
  }

  editExam(Exam: ExaminedExam) {
    return this.http.put(this.url + 'EditExam', Exam);
  }

  deleteExam(id: number) {
    return this.http.delete(this.url + 'DeleteExam/' + id);
  }
}
