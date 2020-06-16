import {IExam} from '../../Interfaces/Exam/IExam';
import {ExaminerQuestion} from '../Questions/ExaminerQuestion';

export class ExaminerExam implements IExam<ExaminerQuestion> {
  examId: number;
  name: string;
  questions: Array<ExaminerQuestion>;
}
