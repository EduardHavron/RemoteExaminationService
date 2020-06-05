import {IQuestion} from '../../Interfaces/Question/IQuestion';
import {ExaminerAnswer} from '../Answers/ExaminerAnswer';

export class ExaminerQuestion implements IQuestion<ExaminerAnswer> {
  questionMessage: string;
  answers: Array<ExaminerAnswer>;
}
