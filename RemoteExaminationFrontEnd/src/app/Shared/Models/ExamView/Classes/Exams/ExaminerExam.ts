import {IExam} from '../../Interfaces/Exam/IExam';
import {ExaminerQuestion} from '../Questions/ExaminerQuestion';

export class ExaminerExam implements IExam<ExaminerQuestion> {
  name: string;
  questions: Array<ExaminerQuestion>;
}
