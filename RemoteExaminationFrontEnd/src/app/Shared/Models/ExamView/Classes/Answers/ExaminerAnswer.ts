import {IAnswer} from '../../Interfaces/Answer/IAnswer';

export class ExaminerAnswer implements IAnswer {
  answer: string;
  IsCorrect: boolean;
}
