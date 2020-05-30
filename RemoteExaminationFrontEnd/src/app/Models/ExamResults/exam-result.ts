import {UserAnswer} from './user-answer';

export interface ExamResult {
  ExamId: number;
  UserAnswer: Array<UserAnswer>;
}
