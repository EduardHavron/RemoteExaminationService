import {IAnswer} from '../Answer/IAnswer';

export interface IQuestion<T extends IAnswer> {
  questionId: number;
  questionMessage: string;
  answers: Array<T>;
}
