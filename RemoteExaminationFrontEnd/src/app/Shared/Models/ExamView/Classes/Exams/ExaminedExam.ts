import {IExam} from '../../Interfaces/Exam/IExam';
import {ExaminerQuestion} from '../Questions/ExaminerQuestion';
import {ExaminedAnswer} from '../Answers/ExaminedAnswer';
import {ExaminedQuestion} from '../Questions/ExaminedQuestion';
import {IQuestion} from '../../Interfaces/Question/IQuestion';

export class ExaminedExam implements IExam<ExaminedQuestion> {
  examId: number;
  name: string;
  questions: Array<ExaminedQuestion>;
}
