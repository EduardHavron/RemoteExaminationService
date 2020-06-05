import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IExam} from '../../Models/ExamView/Interfaces/Exam/IExam';
import {IQuestion} from '../../Models/ExamView/Interfaces/Question/IQuestion';
import {IAnswer} from '../../Models/ExamView/Interfaces/Answer/IAnswer';
import {ExaminerExam} from '../../Models/ExamView/Classes/Exams/ExaminerExam';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private url = 'https://localhost:5001/api/Exam/';
  constructor(private http: HttpClient) { }

  getExams(): Observable<Array<IExam<IQuestion<IAnswer>>>> {
    return this.http.get<Array<IExam<IQuestion<IAnswer>>>>(this.url + 'GetExams');
  }

  getExamById(id: number): Observable<IExam<IQuestion<IAnswer>>> {
    return this.http.get<IExam<IQuestion<IAnswer>>>(this.url + 'SignIn/' + id);
  }

  createExam(Exam: ExaminerExam) {
    return this.http.post(this.url + 'CreateExam', Exam);
  }

  editExam(Exam: ExaminerExam) {
    return this.http.put(this.url + 'EditExam', Exam);
  }

  deleteExam(id: number) {
    return this.http.delete(this.url + 'DeleteExam/' + id);
  }
}
