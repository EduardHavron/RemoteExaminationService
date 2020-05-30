import {ExaminedAnswer} from './examined-answer';

export interface ExaminerAnswer extends ExaminedAnswer{
  IsCorrect: boolean;
}
